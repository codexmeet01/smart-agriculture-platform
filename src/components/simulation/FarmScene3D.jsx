import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RotateCw, Compass, Eye, Play, Square, Sparkles, Navigation, Layers } from "lucide-react";

export const FarmScene3D = ({
  timeOfDay = "noon",
  weatherCondition = "sunny",
  sprinklersOn = false,
  droneActive = true,
  viewMode = "surface",
  selectedEntity = "plot-a",
  onSelectEntity,
}) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  // References to dynamic 3D elements
  const droneGroupRef = useRef(null);
  const droneRotorsRef = useRef([]);
  const laserConeRef = useRef(null);
  const wheatStalksRef = useRef([]);
  const waterParticlesRef = useRef(null);
  const rainParticlesRef = useRef(null);
  const sunLightRef = useRef(null);
  const ambientLightRef = useRef(null);
  const hemiLightRef = useRef(null);
  const pondWaterRef = useRef(null);
  const windTurbineBladesRef = useRef(null);
  const cloudsRef = useRef([]);
  const starsRef = useRef(null);
  const plotMeshesRef = useRef({});
  const subsoilGroupRef = useRef(null);
  const surfaceGroupRef = useRef(null);

  const [hoveredPlot, setHoveredPlot] = useState(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [activePreset, setActivePreset] = useState("center");

  // Sky & Lighting Palettes
  const skyPalettes = {
    dawn: {
      bg: 0xfde68a,
      fog: 0xfef3c7,
      sunColor: 0xffaa66,
      sunIntensity: 1.4,
      sunPos: [-25, 18, 20],
      ambientColor: 0xffedd5,
      ambientIntensity: 0.6,
      hemiSky: 0xfde047,
      hemiGround: 0x4d7c0f,
    },
    noon: {
      bg: 0x38bdf8,
      fog: 0xbae6fd,
      sunColor: 0xffffff,
      sunIntensity: 2.2,
      sunPos: [20, 35, 20],
      ambientColor: 0xffffff,
      ambientIntensity: 0.7,
      hemiSky: 0x38bdf8,
      hemiGround: 0x2e4823,
    },
    sunset: {
      bg: 0xf97316,
      fog: 0xc2410c,
      sunColor: 0xff5511,
      sunIntensity: 1.6,
      sunPos: [32, 10, -25],
      ambientColor: 0xfed7aa,
      ambientIntensity: 0.5,
      hemiSky: 0xf97316,
      hemiGround: 0x3f2e16,
    },
    night: {
      bg: 0x030712,
      fog: 0x0b1329,
      sunColor: 0x7dd3fc,
      sunIntensity: 0.35,
      sunPos: [0, 30, -30],
      ambientColor: 0x091e2b,
      ambientIntensity: 0.3,
      hemiSky: 0x1e293b,
      hemiGround: 0x022c22,
    },
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const currentPalette = skyPalettes[timeOfDay] || skyPalettes.noon;
    scene.background = new THREE.Color(currentPalette.bg);
    scene.fog = new THREE.FogExp2(currentPalette.fog, 0.007);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    // Centered isometric framing: looks at center of farm (0, -0.5, 0)
    camera.position.set(24, 15, 24);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 2. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2 - 0.08; // Prevent dipping beneath ground
    controls.minDistance = 8;
    controls.maxDistance = 60;
    controls.target.set(0, -0.5, 0); // Exact center of farm plateau
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.9;
    controlsRef.current = controls;

    // 3. Lighting System
    const hemiLight = new THREE.HemisphereLight(
      currentPalette.hemiSky,
      currentPalette.hemiGround,
      0.65
    );
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const ambientLight = new THREE.AmbientLight(currentPalette.ambientColor, currentPalette.ambientIntensity);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const sunLight = new THREE.DirectionalLight(currentPalette.sunColor, currentPalette.sunIntensity);
    sunLight.position.set(...currentPalette.sunPos);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 120;
    sunLight.shadow.camera.left = -28;
    sunLight.shadow.camera.right = 28;
    sunLight.shadow.camera.top = 28;
    sunLight.shadow.camera.bottom = -28;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // Secondary subtle fill light
    const fillLight = new THREE.DirectionalLight(0x90e0ef, 0.4);
    fillLight.position.set(-20, 16, -20);
    scene.add(fillLight);

    // 4. Group for Surface objects & Subsoil objects
    const surfaceGroup = new THREE.Group();
    scene.add(surfaceGroup);
    surfaceGroupRef.current = surfaceGroup;

    const subsoilGroup = new THREE.Group();
    subsoilGroup.visible = false;
    scene.add(subsoilGroup);
    subsoilGroupRef.current = subsoilGroup;

    // ==========================================
    // DISTANT HORIZON ROLLING HILLS (SURROUNDING LANDSCAPE)
    // ==========================================
    const horizonGroup = new THREE.Group();
    const hillMat = new THREE.MeshStandardMaterial({
      color: 0x224c1c,
      roughness: 0.95,
      flatShading: true,
    });

    const hillPositions = [
      [-55, -2, -45, 22, 14],
      [50, -2, -50, 26, 16],
      [-50, -2, 50, 24, 15],
      [55, -2, 45, 20, 13],
      [0, -2, -65, 30, 18],
      [0, -2, 65, 28, 16],
    ];

    hillPositions.forEach(([hx, hy, hz, hRadius, hHeight]) => {
      const hillGeo = new THREE.ConeGeometry(hRadius, hHeight, 7);
      const hill = new THREE.Mesh(hillGeo, hillMat);
      hill.position.set(hx, hy + hHeight / 2 - 4, hz);
      hill.receiveShadow = true;
      horizonGroup.add(hill);
    });

    // Outer horizon grassland floor
    const outerFloorGeo = new THREE.PlaneGeometry(240, 240);
    const outerFloorMat = new THREE.MeshStandardMaterial({
      color: 0x1b3b16,
      roughness: 1.0,
    });
    const outerFloor = new THREE.Mesh(outerFloorGeo, outerFloorMat);
    outerFloor.rotation.x = -Math.PI / 2;
    outerFloor.position.y = -4.8;
    outerFloor.receiveShadow = true;
    horizonGroup.add(outerFloor);
    scene.add(horizonGroup);

    // ==========================================
    // 3D FLOATING CLOUDS IN SKY
    // ==========================================
    const clouds = [];
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      flatShading: true,
      transparent: true,
      opacity: 0.9,
    });

    for (let c = 0; c < 7; c++) {
      const cloudGroup = new THREE.Group();
      const numBlobs = 4 + Math.floor(Math.random() * 4);
      for (let b = 0; b < numBlobs; b++) {
        const radius = 1.4 + Math.random() * 1.8;
        const sphereGeo = new THREE.DodecahedronGeometry(radius, 1);
        const sphere = new THREE.Mesh(sphereGeo, cloudMat);
        sphere.position.set(
          (b - numBlobs / 2) * 1.8 + (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.6,
          (Math.random() - 0.5) * 1.2
        );
        sphere.castShadow = true;
        cloudGroup.add(sphere);
      }
      const cx = (Math.random() - 0.5) * 60;
      const cy = 18 + Math.random() * 6;
      const cz = (Math.random() - 0.5) * 60;
      cloudGroup.position.set(cx, cy, cz);
      scene.add(cloudGroup);
      clouds.push({ group: cloudGroup, speed: 0.015 + Math.random() * 0.02 });
    }
    cloudsRef.current = clouds;

    // ==========================================
    // 3D STARRY SKY PARTICLES (FOR NIGHT TIME)
    // ==========================================
    const starCount = 600;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let s = 0; s < starCount; s++) {
      starPos[s * 3] = (Math.random() - 0.5) * 160;
      starPos[s * 3 + 1] = 20 + Math.random() * 70;
      starPos[s * 3 + 2] = (Math.random() - 0.5) * 160;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.45,
      transparent: true,
      opacity: timeOfDay === "night" ? 0.9 : 0.0,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);
    starsRef.current = starField;

    // ==========================================
    // 5. MAIN FARM ISLAND PLATEAU
    // ==========================================
    // Top Lush Grass Layer
    const baseGeo = new THREE.BoxGeometry(34, 1.8, 34);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x316024,
      roughness: 0.85,
      metalness: 0.05,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.9;
    baseMesh.receiveShadow = true;
    surfaceGroup.add(baseMesh);

    // Subsoil layer underneath the plateau
    const subDirtGeo = new THREE.BoxGeometry(34, 3.2, 34);
    const subDirtMat = new THREE.MeshStandardMaterial({
      color: 0x3d2516,
      roughness: 0.95,
    });
    const subDirt = new THREE.Mesh(subDirtGeo, subDirtMat);
    subDirt.position.y = -3.4;
    subDirt.receiveShadow = true;
    surfaceGroup.add(subDirt);

    // Crossroads Farm Tracks
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x8a7756, roughness: 0.9 });
    const roadMain = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 33), roadMat);
    roadMain.rotation.x = -Math.PI / 2;
    roadMain.position.set(0, 0.02, 0);
    roadMain.receiveShadow = true;
    surfaceGroup.add(roadMain);

    const roadCross = new THREE.Mesh(new THREE.PlaneGeometry(33, 2.8), roadMat);
    roadCross.rotation.x = -Math.PI / 2;
    roadCross.position.set(0, 0.02, 0);
    roadCross.receiveShadow = true;
    surfaceGroup.add(roadCross);

    // ==========================================
    // RAINWATER POND & RESERVOIR (Bottom-Left)
    // ==========================================
    const pondGeo = new THREE.CylinderGeometry(4.2, 4.8, 0.6, 24);
    const pondMat = new THREE.MeshStandardMaterial({
      color: 0x0077b6,
      roughness: 0.08,
      metalness: 0.45,
      transparent: true,
      opacity: 0.88,
    });
    const pond = new THREE.Mesh(pondGeo, pondMat);
    pond.position.set(-10, 0.1, 10);
    pond.receiveShadow = true;
    surfaceGroup.add(pond);
    pondWaterRef.current = pond;

    // Stone embankment ring around pond
    const ringGeo = new THREE.TorusGeometry(4.4, 0.35, 8, 24);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x6c757d, roughness: 0.9 });
    const pondRing = new THREE.Mesh(ringGeo, ringMat);
    pondRing.rotation.x = Math.PI / 2;
    pondRing.position.set(-10, 0.25, 10);
    surfaceGroup.add(pondRing);

    // Small wooden jetty / dock on pond
    const dockGeo = new THREE.BoxGeometry(1.6, 0.15, 3.2);
    const dockMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });
    const dock = new THREE.Mesh(dockGeo, dockMat);
    dock.position.set(-10, 0.3, 6.2);
    dock.castShadow = true;
    surfaceGroup.add(dock);

    // ==========================================
    // PLOT A: Golden Wheat Field (Top-Left)
    // ==========================================
    const plotAGeo = new THREE.BoxGeometry(11.5, 0.35, 11.5);
    const plotAMat = new THREE.MeshStandardMaterial({ color: 0x4a3419, roughness: 0.9 });
    const plotAMesh = new THREE.Mesh(plotAGeo, plotAMat);
    plotAMesh.position.set(-8.5, 0.18, -8.5);
    plotAMesh.receiveShadow = true;
    plotAMesh.userData = { id: "plot-a", name: "Plot A - North Wheat Basin" };
    surfaceGroup.add(plotAMesh);
    plotMeshesRef.current["plot-a"] = plotAMesh;

    // 3D Wheat Stalks
    const stalkGeo = new THREE.CylinderGeometry(0.04, 0.06, 1.2, 4);
    const earGeo = new THREE.ConeGeometry(0.12, 0.45, 5);
    const stalkMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.7 });
    const earMat = new THREE.MeshStandardMaterial({ color: 0xe9c46a, roughness: 0.6 });

    const wheatGroup = new THREE.Group();
    const stalks = [];
    for (let x = -4.5; x <= 4.5; x += 1.2) {
      for (let z = -4.5; z <= 4.5; z += 1.2) {
        const stalk = new THREE.Group();
        const stem = new THREE.Mesh(stalkGeo, stalkMat);
        stem.position.y = 0.6;
        stem.castShadow = true;
        const ear = new THREE.Mesh(earGeo, earMat);
        ear.position.y = 1.3;
        ear.castShadow = true;
        stalk.add(stem);
        stalk.add(ear);
        stalk.position.set(x + (Math.random() - 0.5) * 0.3, 0.35, z + (Math.random() - 0.5) * 0.3);
        wheatGroup.add(stalk);
        stalks.push({ obj: stalk, initialRotZ: stalk.rotation.z, offset: Math.random() * 5 });
      }
    }
    plotAMesh.add(wheatGroup);
    wheatStalksRef.current = stalks;

    // IoT Sensor Node on Plot A
    const nodePole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 2.2, 8),
      new THREE.MeshStandardMaterial({ color: 0xced4da, metalness: 0.7 })
    );
    nodePole.position.set(-4, 1.3, -4);
    nodePole.castShadow = true;
    surfaceGroup.add(nodePole);

    const nodeLight = new THREE.PointLight(0x10b981, 1.8, 6);
    nodeLight.position.set(-4, 2.3, -4);
    surfaceGroup.add(nodeLight);

    const nodeHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0x10b981 })
    );
    nodeHead.position.set(-4, 2.3, -4);
    surfaceGroup.add(nodeHead);

    // ==========================================
    // PLOT B: Rice Paddy (Top-Right)
    // ==========================================
    const plotBGeo = new THREE.BoxGeometry(11.5, 0.3, 11.5);
    const plotBMat = new THREE.MeshStandardMaterial({ color: 0x2b1e13, roughness: 0.95 });
    const plotBMesh = new THREE.Mesh(plotBGeo, plotBMat);
    plotBMesh.position.set(8.5, 0.15, -8.5);
    plotBMesh.receiveShadow = true;
    plotBMesh.userData = { id: "plot-b", name: "Plot B - Central Rice Paddy" };
    surfaceGroup.add(plotBMesh);
    plotMeshesRef.current["plot-b"] = plotBMesh;

    // Paddy water shimmer surface
    const paddyWater = new THREE.Mesh(
      new THREE.PlaneGeometry(10.8, 10.8),
      new THREE.MeshStandardMaterial({
        color: 0x0a5c36,
        roughness: 0.12,
        metalness: 0.3,
        transparent: true,
        opacity: 0.8,
      })
    );
    paddyWater.rotation.x = -Math.PI / 2;
    paddyWater.position.set(8.5, 0.32, -8.5);
    surfaceGroup.add(paddyWater);

    // Rice shoots in paddy
    const riceGeo = new THREE.ConeGeometry(0.08, 0.85, 4);
    const riceMat = new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.6 });
    for (let rx = -4.2; rx <= 4.2; rx += 1.3) {
      for (let rz = -4.2; rz <= 4.2; rz += 1.3) {
        const shoot = new THREE.Mesh(riceGeo, riceMat);
        shoot.position.set(8.5 + rx, 0.68, -8.5 + rz);
        shoot.castShadow = true;
        surfaceGroup.add(shoot);
      }
    }

    // IoT Node for Plot B (Amber LED - 42% moisture)
    const nodeBHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b })
    );
    nodeBHead.position.set(4, 2.2, -4);
    surfaceGroup.add(nodeBHead);

    // ==========================================
    // PLOT C: Precision Polyhouse / Greenhouse (Bottom-Right)
    // ==========================================
    const plotCGeo = new THREE.BoxGeometry(11.5, 0.35, 11.5);
    const plotCMat = new THREE.MeshStandardMaterial({ color: 0x384a28, roughness: 0.9 });
    const plotCMesh = new THREE.Mesh(plotCGeo, plotCMat);
    plotCMesh.position.set(8.5, 0.18, 8.5);
    plotCMesh.receiveShadow = true;
    plotCMesh.userData = { id: "plot-c", name: "Plot C - Precision Greenhouse" };
    surfaceGroup.add(plotCMesh);
    plotMeshesRef.current["plot-c"] = plotCMesh;

    // Transparent Greenhouse Glass Canopy
    const ghArchGeo = new THREE.CylinderGeometry(3.6, 3.6, 8.2, 16, 1, false, 0, Math.PI);
    const ghGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xd8f3dc,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 0.5,
    });
    const greenhouse = new THREE.Mesh(ghArchGeo, ghGlassMat);
    greenhouse.rotation.z = Math.PI / 2;
    greenhouse.rotation.y = Math.PI / 2;
    greenhouse.position.set(8.5, 3.2, 8.5);
    surfaceGroup.add(greenhouse);

    // Greenhouse foundation frame
    const ghFrameMat = new THREE.MeshStandardMaterial({ color: 0xced4da, metalness: 0.85 });
    const ghFrame = new THREE.Mesh(new THREE.BoxGeometry(8.4, 0.3, 7.4), ghFrameMat);
    ghFrame.position.set(8.5, 0.35, 8.5);
    surfaceGroup.add(ghFrame);

    // Tomato vines & red fruits inside greenhouse
    const tomatoMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
    const vineMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.7 });
    for (let tx = -2.4; tx <= 2.4; tx += 2.2) {
      for (let tz = -2.4; tz <= 2.4; tz += 2.2) {
        const vine = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 1.8, 6), vineMat);
        vine.position.set(8.5 + tx, 1.1, 8.5 + tz);
        vine.castShadow = true;
        surfaceGroup.add(vine);

        const fruit = new THREE.Mesh(new THREE.SphereGeometry(0.18, 6, 6), tomatoMat);
        fruit.position.set(8.5 + tx + 0.15, 1.3, 8.5 + tz + 0.15);
        fruit.castShadow = true;
        surfaceGroup.add(fruit);
      }
    }

    // ==========================================
    // SOLAR MICROGRID & WIND TURBINE (Renewable Hub)
    // ==========================================
    const solarHubGroup = new THREE.Group();
    solarHubGroup.position.set(-9.5, 0, 0);
    solarHubGroup.userData = { id: "solar-hub", name: "Solar & Clean Energy Microgrid" };
    surfaceGroup.add(solarHubGroup);
    plotMeshesRef.current["solar-hub"] = solarHubGroup;

    // Solar panels on tilt rack
    const panelGeo = new THREE.BoxGeometry(3.8, 0.08, 2.2);
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.15,
      metalness: 0.85,
    });
    for (let p = 0; p < 2; p++) {
      const panel = new THREE.Mesh(panelGeo, panelMat);
      panel.position.set(0, 1.6 + p * 0.2, p * 2.8 - 1.4);
      panel.rotation.x = -Math.PI / 6; // tilted towards sun
      panel.castShadow = true;
      solarHubGroup.add(panel);

      const leg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.07, 1.6, 6),
        new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.7 })
      );
      leg.position.set(0, 0.8, p * 2.8 - 1.4);
      leg.castShadow = true;
      solarHubGroup.add(leg);
    }

    // Modern Inverter & Smart Battery Storage Box
    const pumpBox = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 1.8, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x059669, metalness: 0.6, roughness: 0.3 })
    );
    pumpBox.position.set(2.8, 0.9, 0);
    pumpBox.castShadow = true;
    solarHubGroup.add(pumpBox);

    // ==========================================
    // 3D WIND TURBINE (Clean Energy)
    // ==========================================
    const turbineGroup = new THREE.Group();
    turbineGroup.position.set(-13, 0, -13);
    surfaceGroup.add(turbineGroup);

    // Mast / Tower
    const towerGeo = new THREE.CylinderGeometry(0.25, 0.5, 9, 8);
    const towerMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4, metalness: 0.5 });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.y = 4.5;
    tower.castShadow = true;
    turbineGroup.add(tower);

    // Nacelle / Generator
    const nacelleGeo = new THREE.BoxGeometry(0.6, 0.6, 1.2);
    const nacelle = new THREE.Mesh(nacelleGeo, towerMat);
    nacelle.position.set(0, 9, 0.2);
    nacelle.castShadow = true;
    turbineGroup.add(nacelle);

    // Rotor Hub & 3 Aerodynamic Blades
    const rotorGroup = new THREE.Group();
    rotorGroup.position.set(0, 9, 0.85);
    turbineGroup.add(rotorGroup);
    windTurbineBladesRef.current = rotorGroup;

    const bladeGeo = new THREE.BoxGeometry(0.22, 3.8, 0.06);
    bladeGeo.translate(0, 1.9, 0);
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });

    for (let b = 0; b < 3; b++) {
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.rotation.z = (b * Math.PI * 2) / 3;
      blade.castShadow = true;
      rotorGroup.add(blade);
    }

    // ==========================================
    // 3D RED FARM TRACTOR & STORAGE SILO
    // ==========================================
    const tractorGroup = new THREE.Group();
    tractorGroup.position.set(0, 0, 5.5);
    tractorGroup.rotation.y = Math.PI / 4;
    surfaceGroup.add(tractorGroup);

    // Tractor Body
    const tractorBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 1.0, 2.6),
      new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.4, roughness: 0.4 })
    );
    tractorBody.position.y = 0.8;
    tractorBody.castShadow = true;
    tractorGroup.add(tractorBody);

    // Tractor Cab Roof
    const cabRoof = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.1, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 })
    );
    cabRoof.position.set(0, 1.8, -0.4);
    cabRoof.castShadow = true;
    tractorGroup.add(cabRoof);

    // Large Rear Wheels
    const rearWheelGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.4, 12);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.9 });
    [-0.9, 0.9].forEach((wx) => {
      const rw = new THREE.Mesh(rearWheelGeo, wheelMat);
      rw.rotation.z = Math.PI / 2;
      rw.position.set(wx, 0.6, -0.6);
      rw.castShadow = true;
      tractorGroup.add(rw);
    });

    // Front Wheels
    const frontWheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.3, 12);
    [-0.85, 0.85].forEach((wx) => {
      const fw = new THREE.Mesh(frontWheelGeo, wheelMat);
      fw.rotation.z = Math.PI / 2;
      fw.position.set(wx, 0.38, 0.8);
      fw.castShadow = true;
      tractorGroup.add(fw);
    });

    // Silver Grain Silo
    const siloGroup = new THREE.Group();
    siloGroup.position.set(13.5, 0, 0);
    surfaceGroup.add(siloGroup);

    const siloMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.6, 6, 16),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.8, roughness: 0.25 })
    );
    siloMesh.position.y = 3;
    siloMesh.castShadow = true;
    siloGroup.add(siloMesh);

    const siloCap = new THREE.Mesh(
      new THREE.ConeGeometry(1.7, 1.2, 16),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.7 })
    );
    siloCap.position.y = 6.6;
    siloCap.castShadow = true;
    siloGroup.add(siloCap);

    // ==========================================
    // PERIMETER TREES
    // ==========================================
    const treePositions = [
      [-14, 0, 14],
      [-14, 0, 7],
      [-14, 0, -7],
      [14, 0, -14],
      [7, 0, -14],
      [-7, 0, -14],
      [14, 0, 14],
    ];

    const trunkGeo = new THREE.CylinderGeometry(0.18, 0.25, 1.4, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c3d2e, roughness: 0.9 });
    const foliageGeo = new THREE.DodecahedronGeometry(1.2, 1);
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });

    treePositions.forEach(([tx, ty, tz]) => {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 0.7;
      trunk.castShadow = true;
      tree.add(trunk);

      const foliage = new THREE.Mesh(foliageGeo, foliageMat);
      foliage.position.y = 1.9;
      foliage.castShadow = true;
      tree.add(foliage);

      tree.position.set(tx, ty, tz);
      surfaceGroup.add(tree);
    });

    // ==========================================
    // 3D PRECISION SPRINKLER & WATER PARTICLES
    // ==========================================
    const sprinklerCount = 500;
    const sprinklerGeo = new THREE.BufferGeometry();
    const sprinklerPos = new Float32Array(sprinklerCount * 3);
    const sprinklerVel = [];

    for (let i = 0; i < sprinklerCount; i++) {
      sprinklerPos[i * 3] = -8.5;
      sprinklerPos[i * 3 + 1] = 0.8;
      sprinklerPos[i * 3 + 2] = -8.5;

      const angle = Math.random() * Math.PI * 2;
      const speed = 0.08 + Math.random() * 0.15;
      sprinklerVel.push({
        vx: Math.cos(angle) * speed,
        vy: 0.14 + Math.random() * 0.14,
        vz: Math.sin(angle) * speed,
      });
    }

    sprinklerGeo.setAttribute("position", new THREE.BufferAttribute(sprinklerPos, 3));
    const sprinklerMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.25,
      transparent: true,
      opacity: 0.9,
    });
    const sprinklerPoints = new THREE.Points(sprinklerGeo, sprinklerMat);
    sprinklerPoints.visible = false;
    surfaceGroup.add(sprinklerPoints);
    waterParticlesRef.current = { points: sprinklerPoints, vel: sprinklerVel, pos: sprinklerPos };

    // ==========================================
    // 3D RAINFALL PARTICLE SYSTEM
    // ==========================================
    const rainCount = 1500;
    const rainGeo = new THREE.BufferGeometry();
    const rainPos = new Float32Array(rainCount * 3);

    for (let i = 0; i < rainCount; i++) {
      rainPos[i * 3] = (Math.random() - 0.5) * 55;
      rainPos[i * 3 + 1] = Math.random() * 45;
      rainPos[i * 3 + 2] = (Math.random() - 0.5) * 55;
    }
    rainGeo.setAttribute("position", new THREE.BufferAttribute(rainPos, 3));
    const rainMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.2,
      transparent: true,
      opacity: 0.75,
    });
    const rainPoints = new THREE.Points(rainGeo, rainMat);
    rainPoints.visible = false;
    scene.add(rainPoints);
    rainParticlesRef.current = { points: rainPoints, pos: rainPos };

    // ==========================================
    // 3D AUTONOMOUS AGRI-DRONE
    // ==========================================
    const droneGroup = new THREE.Group();
    droneGroup.position.set(0, 9.5, 0);
    droneGroup.userData = { id: "drone", name: "Autonomous Agri-Drone" };
    scene.add(droneGroup);
    droneGroupRef.current = droneGroup;
    plotMeshesRef.current["drone"] = droneGroup;

    // Drone central body
    const bodyMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 0.7, 0.4, 8),
      new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.85, roughness: 0.2 })
    );
    droneGroup.add(bodyMesh);

    // Glowing status dome
    const domeMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0x10b981 })
    );
    domeMesh.position.y = 0.2;
    droneGroup.add(domeMesh);

    // 4 Quadcopter Arms & Rotors
    const armMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9 });
    const rotorMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.75 });
    const rotors = [];

    const armOffsets = [
      [1.3, 1.3],
      [-1.3, 1.3],
      [1.3, -1.3],
      [-1.3, -1.3],
    ];

    armOffsets.forEach(([ax, az]) => {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 1.4), armMat);
      arm.position.set(ax / 2, 0, az / 2);
      arm.lookAt(ax, 0, az);
      droneGroup.add(arm);

      const pod = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.3, 6), armMat);
      pod.position.set(ax, 0.1, az);
      droneGroup.add(pod);

      const rotor = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.02, 0.18), rotorMat);
      rotor.position.set(ax, 0.25, az);
      droneGroup.add(rotor);
      rotors.push(rotor);
    });
    droneRotorsRef.current = rotors;

    // Downward LiDAR Volumetric Cone
    const coneGeo = new THREE.ConeGeometry(4.5, 9.5, 16, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const laserCone = new THREE.Mesh(coneGeo, coneMat);
    laserCone.position.set(0, -4.75, 0);
    droneGroup.add(laserCone);
    laserConeRef.current = laserCone;

    // ==========================================
    // SUBSURFACE ROOT ZONE CUTAWAY 3D MODEL
    // ==========================================
    const subTopsoil = new THREE.Mesh(
      new THREE.BoxGeometry(26, 1.5, 26),
      new THREE.MeshStandardMaterial({ color: 0x583119, roughness: 0.95 })
    );
    subTopsoil.position.y = 1;
    subsoilGroup.add(subTopsoil);

    const subRootZone = new THREE.Mesh(
      new THREE.BoxGeometry(26, 3, 26),
      new THREE.MeshStandardMaterial({ color: 0x3d2010, roughness: 0.95 })
    );
    subRootZone.position.y = -1.25;
    subsoilGroup.add(subRootZone);

    const subAquifer = new THREE.Mesh(
      new THREE.BoxGeometry(26, 2.5, 26),
      new THREE.MeshStandardMaterial({ color: 0x0f4c5c, roughness: 0.4, transparent: true, opacity: 0.9 })
    );
    subAquifer.position.y = -4;
    subsoilGroup.add(subAquifer);

    const rootMat = new THREE.MeshStandardMaterial({ color: 0xf4a261, roughness: 0.8 });
    for (let r = 0; r < 26; r++) {
      const rootCurve = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.12, 2.8, 5),
        rootMat
      );
      rootCurve.position.set(
        (Math.random() - 0.5) * 18,
        -0.5 - Math.random() * 1.5,
        (Math.random() - 0.5) * 18
      );
      rootCurve.rotation.z = (Math.random() - 0.5) * 0.5;
      rootCurve.rotation.x = (Math.random() - 0.5) * 0.5;
      subsoilGroup.add(rootCurve);
    }

    // ==========================================
    // 7. Raycasting / Click & Hover Interaction
    // ==========================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const interactables = Object.values(plotMeshesRef.current);
      const intersects = raycaster.intersectObjects(interactables, true);

      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj && !obj.userData?.id) {
          obj = obj.parent;
        }
        if (obj?.userData?.id) {
          setHoveredPlot(obj.userData.id);
          container.style.cursor = "pointer";
          return;
        }
      }
      setHoveredPlot(null);
      container.style.cursor = "grab";
    };

    const handleClick = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const interactables = Object.values(plotMeshesRef.current);
      const intersects = raycaster.intersectObjects(interactables, true);

      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj && !obj.userData?.id) {
          obj = obj.parent;
        }
        if (obj?.userData?.id) {
          onSelectEntity?.(obj.userData.id);
        }
      }
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("click", handleClick);

    // ==========================================
    // 8. Animation & Physics Render Loop
    // ==========================================
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Controls update
      controls.update();

      // Wind turbine rotation
      if (windTurbineBladesRef.current) {
        windTurbineBladesRef.current.rotation.z += 0.035;
      }

      // Drift clouds across sky
      cloudsRef.current.forEach((c) => {
        c.group.position.x += c.speed;
        if (c.group.position.x > 70) {
          c.group.position.x = -70;
        }
      });

      // Sway wheat stalks with wind
      wheatStalksRef.current.forEach((stalk) => {
        stalk.obj.rotation.z = Math.sin(elapsedTime * 2.5 + stalk.offset) * 0.08;
      });

      // Drone flight patrol & rotor spin
      if (droneGroupRef.current && droneActive) {
        droneRotorsRef.current.forEach((rotor) => {
          rotor.rotation.y += 0.45;
        });

        const droneRadius = 11;
        const droneSpeed = 0.45;
        const dx = Math.sin(elapsedTime * droneSpeed) * droneRadius;
        const dz = Math.cos(elapsedTime * droneSpeed * 0.8) * droneRadius;
        const dy = 9.5 + Math.sin(elapsedTime * 2) * 0.35;

        droneGroupRef.current.position.set(dx, dy, dz);
        droneGroupRef.current.rotation.y = -elapsedTime * droneSpeed + Math.PI / 2;
        droneGroupRef.current.rotation.z = Math.sin(elapsedTime * droneSpeed) * 0.1;

        if (laserConeRef.current) {
          laserConeRef.current.material.opacity = 0.16 + Math.sin(elapsedTime * 4) * 0.08;
        }
      }

      // Sprinkler water particle physics
      if (waterParticlesRef.current && sprinklersOn) {
        const { pos, vel, points } = waterParticlesRef.current;
        points.visible = true;

        for (let i = 0; i < sprinklerCount; i++) {
          pos[i * 3] += vel[i].vx;
          pos[i * 3 + 1] += vel[i].vy;
          pos[i * 3 + 2] += vel[i].vz;

          vel[i].vy -= 0.007; // Gravity

          if (pos[i * 3 + 1] <= 0.35) {
            pos[i * 3] = -8.5;
            pos[i * 3 + 1] = 0.8;
            pos[i * 3 + 2] = -8.5;

            const angle = elapsedTime * 3 + Math.random() * 1.5;
            const speed = 0.08 + Math.random() * 0.14;
            vel[i].vx = Math.cos(angle) * speed;
            vel[i].vy = 0.13 + Math.random() * 0.13;
            vel[i].vz = Math.sin(angle) * speed;
          }
        }
        points.geometry.attributes.position.needsUpdate = true;
      } else if (waterParticlesRef.current) {
        waterParticlesRef.current.points.visible = false;
      }

      // Rain particle animation
      if (rainParticlesRef.current && weatherCondition === "rain") {
        const { pos, points } = rainParticlesRef.current;
        points.visible = true;

        for (let i = 0; i < rainCount; i++) {
          pos[i * 3 + 1] -= 0.85;
          if (pos[i * 3 + 1] < 0) {
            pos[i * 3 + 1] = 38 + Math.random() * 5;
          }
        }
        points.geometry.attributes.position.needsUpdate = true;
      } else if (rainParticlesRef.current) {
        rainParticlesRef.current.points.visible = false;
      }

      // Water pond gentle pulsation
      if (pondWaterRef.current) {
        pondWaterRef.current.material.opacity = 0.84 + Math.sin(elapsedTime * 2.2) * 0.06;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameIdRef.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Environment Lighting and Sky when timeOfDay changes
  useEffect(() => {
    if (!sceneRef.current || !sunLightRef.current || !ambientLightRef.current || !hemiLightRef.current) return;

    const p = skyPalettes[timeOfDay] || skyPalettes.noon;

    sceneRef.current.background = new THREE.Color(p.bg);
    sceneRef.current.fog.color = new THREE.Color(p.fog);

    sunLightRef.current.color.setHex(p.sunColor);
    sunLightRef.current.intensity = p.sunIntensity;
    sunLightRef.current.position.set(...p.sunPos);

    ambientLightRef.current.color.setHex(p.ambientColor);
    ambientLightRef.current.intensity = p.ambientIntensity;

    hemiLightRef.current.color.setHex(p.hemiSky);
    hemiLightRef.current.groundColor.setHex(p.hemiGround);

    if (starsRef.current) {
      starsRef.current.material.opacity = timeOfDay === "night" ? 0.9 : 0.0;
    }
  }, [timeOfDay]);

  // Update Surface vs Subsoil View Mode
  useEffect(() => {
    if (!surfaceGroupRef.current || !subsoilGroupRef.current) return;
    if (viewMode === "subsurface") {
      surfaceGroupRef.current.visible = false;
      subsoilGroupRef.current.visible = true;
      if (cameraRef.current && controlsRef.current) {
        cameraRef.current.position.set(16, 4, 18);
        controlsRef.current.target.set(0, -1.5, 0);
      }
    } else {
      surfaceGroupRef.current.visible = true;
      subsoilGroupRef.current.visible = false;
      if (cameraRef.current && controlsRef.current) {
        cameraRef.current.position.set(24, 15, 24);
        controlsRef.current.target.set(0, -0.5, 0);
      }
    }
  }, [viewMode]);

  // Highlight selected entity
  useEffect(() => {
    Object.entries(plotMeshesRef.current).forEach(([id, mesh]) => {
      if (mesh.material) {
        if (id === selectedEntity) {
          mesh.material.emissive = new THREE.Color(0x059669);
          mesh.material.emissiveIntensity = 0.35;
        } else {
          mesh.material.emissive = new THREE.Color(0x000000);
          mesh.material.emissiveIntensity = 0;
        }
      }
    });
  }, [selectedEntity]);

  // Camera Presets handler
  const setCameraPreset = (preset) => {
    if (!cameraRef.current || !controlsRef.current) return;
    setActivePreset(preset);

    if (preset === "center") {
      cameraRef.current.position.set(24, 15, 24);
      controlsRef.current.target.set(0, -0.5, 0);
    } else if (preset === "drone") {
      cameraRef.current.position.set(0, 32, 0.1);
      controlsRef.current.target.set(0, 0, 0);
    } else if (preset === "wheat") {
      cameraRef.current.position.set(-14, 6, -14);
      controlsRef.current.target.set(-8.5, 0.5, -8.5);
    } else if (preset === "irrigation") {
      cameraRef.current.position.set(-16, 7, 16);
      controlsRef.current.target.set(-10, 0.5, 10);
    } else if (preset === "solar") {
      cameraRef.current.position.set(-16, 6, 2);
      controlsRef.current.target.set(-9.5, 1, 0);
    }
  };

  const toggleAutoRotate = () => {
    if (controlsRef.current) {
      const next = !autoRotate;
      controlsRef.current.autoRotate = next;
      setAutoRotate(next);
    }
  };

  return (
    <div className="relative w-full h-[520px] lg:h-[580px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 dark:border-darkbg-border bg-slate-900 transition-all">
      {/* Genuine Three.js Canvas */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Top Left Floating 3D Telemetry Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/20 text-white text-xs shadow-lg">
        <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-bold tracking-wide">3D Digital Twin • Live Engine</span>
      </div>

      {/* Top Right Quick Camera View Presets */}
      <div className="absolute top-4 right-4 z-20 flex flex-wrap items-center gap-1.5 bg-black/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-lg">
        <button
          onClick={() => setCameraPreset("center")}
          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
            activePreset === "center" ? "bg-emerald-600 text-white shadow-md" : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
          title="Full Farm Center View"
        >
          🔄 Center Farm
        </button>
        <button
          onClick={() => setCameraPreset("drone")}
          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
            activePreset === "drone" ? "bg-emerald-600 text-white shadow-md" : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
          title="Top-Down Drone Surveillance"
        >
          🚁 Drone Cam
        </button>
        <button
          onClick={() => setCameraPreset("wheat")}
          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
            activePreset === "wheat" ? "bg-emerald-600 text-white shadow-md" : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
          title="Zoom to Wheat Plot A"
        >
          🌾 Wheat
        </button>
        <button
          onClick={() => setCameraPreset("irrigation")}
          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
            activePreset === "irrigation" ? "bg-emerald-600 text-white shadow-md" : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
          title="Zoom to Pond & Sprinklers"
        >
          💧 Pond & Sprinklers
        </button>
        <button
          onClick={() => setCameraPreset("solar")}
          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
            activePreset === "solar" ? "bg-emerald-600 text-white shadow-md" : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
          title="Zoom to Solar & Wind Station"
        >
          ⚡ Clean Energy
        </button>
        <button
          onClick={toggleAutoRotate}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
            autoRotate ? "bg-amber-500 text-white animate-pulse" : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
          title="Toggle 360° Cinematic Orbit"
        >
          <RotateCw className="h-3.5 w-3.5" />
          <span>{autoRotate ? "Orbiting..." : "360° Orbit"}</span>
        </button>
      </div>

      {/* Bottom Center 3D Viewport Controls Guide */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-white text-[11px] flex items-center gap-3 shadow-lg whitespace-nowrap">
        <span>🖱️ <strong>Left-Click & Drag</strong>: Rotate 360°</span>
        <span>•</span>
        <span>🔍 <strong>Scroll</strong>: Zoom In/Out</span>
        <span>•</span>
        <span>👆 <strong>Click Plot / Node</strong>: Inspect Telemetry</span>
      </div>

      {/* Hover Tooltip */}
      {hoveredPlot && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none bg-emerald-950/95 border-2 border-emerald-400 text-white px-4 py-1.5 rounded-full text-xs font-extrabold shadow-glow animate-bounce">
          🎯 Click to Inspect: {hoveredPlot.toUpperCase()}
        </div>
      )}
    </div>
  );
};
