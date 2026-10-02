import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Holographic Floating Data Labels for interactive 3D objects
const OBJECT_TELEMETRY = {
  solar: {
    id: "solar",
    title: "SOLAR ENERGY",
    line1: "8.4 kWh generated today",
    line2: "19% energy cost saved",
    metric: "8.4 kWh",
    status: "Optimal Output",
    color: "#00D084",
  },
  sensor: {
    id: "sensor",
    title: "SOIL SENSOR #04",
    line1: "Soil Moisture: 64%",
    line2: "Status: Optimal",
    metric: "64%",
    status: "Active 5G Mesh",
    color: "#67F5C2",
  },
  water: {
    id: "water",
    title: "WATER RESERVE",
    line1: "4,280 L Available",
    line2: "28% water saved",
    metric: "4,280 L",
    status: "Drip Connected",
    color: "#38BDF8",
  },
  crop: {
    id: "crop",
    title: "CROP HEALTH",
    line1: "87% Healthy",
    line2: "Irrigation: Optimized",
    metric: "87%",
    status: "Plot A Wheat",
    color: "#00D084",
  },
  weather: {
    id: "weather",
    title: "WEATHER STATION",
    line1: "31°C • 64% Humidity",
    line2: "35% Rain Probability",
    metric: "31°C",
    status: "Station Alpha",
    color: "#F59E0B",
  },
  aicore: {
    id: "aicore",
    title: "AGRI AI CORE",
    line1: "Multi-Sensor Neural Engine",
    line2: "Optimizing Resource Balance",
    metric: "99.8% Eff",
    status: "Autonomous",
    color: "#67F5C2",
  },
};

// Camera Target Stages for Scroll & Button Transitions
export const CAMERA_STAGES = {
  hero: {
    position: new THREE.Vector3(25, 17, 25),
    target: new THREE.Vector3(0, 0, 0),
    title: "Global Farm Overview",
  },
  solar: {
    position: new THREE.Vector3(-14, 5, 4),
    target: new THREE.Vector3(-9.5, 1.2, 0),
    title: "Solar Photovoltaic Station",
  },
  sensor: {
    position: new THREE.Vector3(-6, 3.5, -6),
    target: new THREE.Vector3(-3.5, 1, -3.5),
    title: "IoT Soil Moisture Node #04",
  },
  irrigation: {
    position: new THREE.Vector3(-12, 5.5, 12),
    target: new THREE.Vector3(-8.5, 1, 8.5),
    title: "Precision Drip Irrigation & Reservoir",
  },
  crops: {
    position: new THREE.Vector3(12, 5.5, -9),
    target: new THREE.Vector3(8.5, 1.2, -8.5),
    title: "Plot A Wheat & Plot B Paddy",
  },
  weather: {
    position: new THREE.Vector3(0, 24, 18),
    target: new THREE.Vector3(0, 2, 0),
    title: "Atmospheric & Rain Radar",
  },
  aicore: {
    position: new THREE.Vector3(0, 7.5, 9.5),
    target: new THREE.Vector3(0, 1.2, 0),
    title: "AGRI AI Neural Engine",
  },
  map: {
    position: new THREE.Vector3(22, 14, 22),
    target: new THREE.Vector3(0, -0.5, 0),
    title: "Interactive Digital Twin Map",
  },
};

export const DigitalTwinCanvas = ({
  stage = "hero",
  layers = {
    soilMoisture: true,
    irrigation: true,
    cropHealth: true,
    weather: true,
    energy: true,
  },
  onSelectObject,
  activeCropZone = "zone-a",
  interactiveMode = true,
  weatherMode = "sunny", // 'sunny' | 'rain'
  sprinklersActive = false,
  className = "",
}) => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animationFrameRef = useRef(null);

  // References to animated 3D meshes
  const aiCoreRingsRef = useRef([]);
  const aiCoreSphereRef = useRef(null);
  const dataParticlesRef = useRef(null);
  const windBladesRef = useRef(null);
  const cloudsRef = useRef([]);
  const rainRef = useRef(null);
  const sprinklerPointsRef = useRef(null);
  const streamWaterRef = useRef(null);
  const pipeBeamsRef = useRef([]);
  const wheatRef = useRef([]);
  const interactiveObjectsRef = useRef({});

  // Desired camera target for smooth lerp
  const currentCameraTargetRef = useRef(new THREE.Vector3(25, 17, 25));
  const currentLookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  const isTransitioningRef = useRef(false);

  // Mouse Parallax & Hover State
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [hoveredData, setHoveredData] = useState(null);
  const [hoverScreenPos, setHoverScreenPos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Smooth Camera transition to stage
  useEffect(() => {
    const stageConfig = CAMERA_STAGES[stage] || CAMERA_STAGES.hero;
    currentCameraTargetRef.current.copy(stageConfig.position);
    currentLookAtRef.current.copy(stageConfig.target);
    isTransitioningRef.current = true;
  }, [stage]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene with Deep Futuristic Atmosphere
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x02130e);
    scene.fog = new THREE.FogExp2(0x02130e, 0.012);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(25, 17, 25);
    cameraRef.current = camera;

    // 3. Renderer with ACES Tone Mapping & Soft Shadows
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 6;
    controls.maxDistance = 55;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // 5. Lighting Setup: Dual Emerald & Cyan Atmosphere + Golden Sun
    const ambientLight = new THREE.AmbientLight(0x063323, 1.2);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x00d084, 0x011a12, 0.8);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 2.2);
    sunLight.position.set(22, 38, 18);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 100;
    sunLight.shadow.camera.left = -25;
    sunLight.shadow.camera.right = 25;
    sunLight.shadow.camera.top = 25;
    sunLight.shadow.camera.bottom = -25;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 1.1);
    cyanRim.position.set(-20, 15, -20);
    scene.add(cyanRim);

    // ==========================================
    // 6. MAIN FARM DIGITAL TWIN TERRAIN
    // ==========================================
    const farmRoot = new THREE.Group();
    scene.add(farmRoot);

    // Top fertile grass surface (Dark emerald-moss tone)
    const islandGeo = new THREE.BoxGeometry(32, 1.6, 32);
    const islandMat = new THREE.MeshStandardMaterial({
      color: 0x144026,
      roughness: 0.8,
      metalness: 0.1,
    });
    const islandMesh = new THREE.Mesh(islandGeo, islandMat);
    islandMesh.position.y = -0.8;
    islandMesh.receiveShadow = true;
    farmRoot.add(islandMesh);

    // Subsoil geological layer
    const subsoilGeo = new THREE.BoxGeometry(32, 3, 32);
    const subsoilMat = new THREE.MeshStandardMaterial({
      color: 0x24170f,
      roughness: 0.95,
    });
    const subsoilMesh = new THREE.Mesh(subsoilGeo, subsoilMat);
    subsoilMesh.position.y = -3.1;
    subsoilMesh.receiveShadow = true;
    farmRoot.add(subsoilMesh);

    // Outer horizon rolling hills in dark green mist
    const horizonMat = new THREE.MeshStandardMaterial({ color: 0x082518, roughness: 1.0, flatShading: true });
    const hills = [
      [-45, -2, -40, 18, 12],
      [45, -2, -45, 20, 14],
      [-40, -2, 45, 19, 13],
      [40, -2, 40, 17, 11],
    ];
    hills.forEach(([hx, hy, hz, r, h]) => {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(r, h, 6), horizonMat);
      cone.position.set(hx, hy + h / 2 - 3, hz);
      farmRoot.add(cone);
    });

    // Farm roads / tracks
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x3d3528, roughness: 0.9 });
    const mainRoad = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 31), roadMat);
    mainRoad.rotation.x = -Math.PI / 2;
    mainRoad.position.set(0, 0.02, 0);
    mainRoad.receiveShadow = true;
    farmRoot.add(mainRoad);

    const crossRoad = new THREE.Mesh(new THREE.PlaneGeometry(31, 2.6), roadMat);
    crossRoad.rotation.x = -Math.PI / 2;
    crossRoad.position.set(0, 0.02, 0);
    crossRoad.receiveShadow = true;
    farmRoot.add(crossRoad);

    // ==========================================
    // 7. WATER RESERVOIR & STREAM
    // ==========================================
    const pondGeo = new THREE.CylinderGeometry(4.2, 4.6, 0.5, 24);
    const pondMat = new THREE.MeshStandardMaterial({
      color: 0x0077b6,
      roughness: 0.1,
      metalness: 0.6,
      transparent: true,
      opacity: 0.88,
    });
    const pondMesh = new THREE.Mesh(pondGeo, pondMat);
    pondMesh.position.set(-8.5, 0.1, 8.5);
    pondMesh.receiveShadow = true;
    pondMesh.userData = { type: "water" };
    farmRoot.add(pondMesh);
    interactiveObjectsRef.current["water"] = pondMesh;
    streamWaterRef.current = pondMesh;

    // Pond rim with dark river stone
    const pondRim = new THREE.Mesh(
      new THREE.TorusGeometry(4.4, 0.3, 8, 24),
      new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.85 })
    );
    pondRim.rotation.x = Math.PI / 2;
    pondRim.position.set(-8.5, 0.2, 8.5);
    farmRoot.add(pondRim);

    // Small water stream winding to the crops
    const streamGeo = new THREE.PlaneGeometry(1.6, 12);
    const streamMesh = new THREE.Mesh(streamGeo, pondMat);
    streamMesh.rotation.x = -Math.PI / 2;
    streamMesh.position.set(-8.5, 0.03, 1.5);
    farmRoot.add(streamMesh);

    // ==========================================
    // 8. SOLAR PHOTOVOLTAIC ARRAY & PUMP
    // ==========================================
    const solarGroup = new THREE.Group();
    solarGroup.position.set(-9.5, 0, -1);
    solarGroup.userData = { type: "solar" };
    farmRoot.add(solarGroup);
    interactiveObjectsRef.current["solar"] = solarGroup;

    // 4 high-tech solar panels tilted at 30 degrees
    const panelGeo = new THREE.BoxGeometry(3.6, 0.06, 2.0);
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0x0f2b48,
      roughness: 0.15,
      metalness: 0.9,
    });
    for (let p = 0; p < 2; p++) {
      const panel = new THREE.Mesh(panelGeo, panelMat);
      panel.position.set(0, 1.5 + p * 0.25, p * 2.6 - 1.3);
      panel.rotation.x = -Math.PI / 6;
      panel.castShadow = true;
      panel.userData = { type: "solar" };
      solarGroup.add(panel);

      const leg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 1.5, 6),
        new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 })
      );
      leg.position.set(0, 0.75, p * 2.6 - 1.3);
      leg.castShadow = true;
      solarGroup.add(leg);
    }

    // Solar-powered Irrigation Pump station & storage battery
    const pumpMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 1.8, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x00d084, metalness: 0.6, roughness: 0.3 })
    );
    pumpMesh.position.set(2.6, 0.9, 0);
    pumpMesh.castShadow = true;
    pumpMesh.userData = { type: "solar" };
    solarGroup.add(pumpMesh);

    // Glowing energy pulse ring
    const energyRing = new THREE.Mesh(
      new THREE.RingGeometry(0.9, 1.1, 16),
      new THREE.MeshBasicMaterial({ color: 0x00d084, side: THREE.DoubleSide })
    );
    energyRing.rotation.x = -Math.PI / 2;
    energyRing.position.set(2.6, 1.85, 0);
    solarGroup.add(energyRing);

    // ==========================================
    // 9. SOIL MOISTURE SENSORS (PLOT A & B)
    // ==========================================
    const sensorGroup = new THREE.Group();
    sensorGroup.position.set(-3.5, 0, -3.5);
    sensorGroup.userData = { type: "sensor" };
    farmRoot.add(sensorGroup);
    interactiveObjectsRef.current["sensor"] = sensorGroup;

    // Mast
    const sensorPole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 2.2, 8),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.85 })
    );
    sensorPole.position.y = 1.1;
    sensorPole.castShadow = true;
    sensorPole.userData = { type: "sensor" };
    sensorGroup.add(sensorPole);

    // Pulsing Beacon on top
    const sensorBeacon = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0x67f5c2 })
    );
    sensorBeacon.position.y = 2.2;
    sensorBeacon.userData = { type: "sensor" };
    sensorGroup.add(sensorBeacon);

    const sensorLight = new THREE.PointLight(0x67f5c2, 1.8, 6);
    sensorLight.position.y = 2.2;
    sensorGroup.add(sensorLight);

    // Underground soil moisture probe needle
    const probe = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 1.8, 6),
      new THREE.MeshStandardMaterial({ color: 0x00d084, metalness: 0.9 })
    );
    probe.position.y = -0.9;
    sensorGroup.add(probe);

    // ==========================================
    // 10. PLOT A: GOLDEN WHEAT & PLOT B: RICE
    // ==========================================
    const wheatPlot = new THREE.Group();
    wheatPlot.position.set(8.5, 0, -8.5);
    wheatPlot.userData = { type: "crop", zone: "zone-a" };
    farmRoot.add(wheatPlot);
    interactiveObjectsRef.current["crop"] = wheatPlot;

    const wheatBed = new THREE.Mesh(
      new THREE.BoxGeometry(11, 0.35, 11),
      new THREE.MeshStandardMaterial({ color: 0x3d2714, roughness: 0.95 })
    );
    wheatBed.position.y = 0.18;
    wheatBed.receiveShadow = true;
    wheatBed.userData = { type: "crop" };
    wheatPlot.add(wheatBed);

    // Rows of golden wheat stalks
    const stalkGeo = new THREE.CylinderGeometry(0.04, 0.05, 1.2, 4);
    const earGeo = new THREE.ConeGeometry(0.12, 0.45, 5);
    const stalkMat = new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.7 });
    const earMat = new THREE.MeshStandardMaterial({ color: 0xe9c46a, roughness: 0.5 });
    const wheatStalks = [];

    for (let x = -4.2; x <= 4.2; x += 1.2) {
      for (let z = -4.2; z <= 4.2; z += 1.2) {
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
        wheatPlot.add(stalk);
        wheatStalks.push({ obj: stalk, offset: Math.random() * 6 });
      }
    }
    wheatRef.current = wheatStalks;

    // Plot C Greenhouse (Bottom Right)
    const ghGroup = new THREE.Group();
    ghGroup.position.set(8.5, 0, 8.5);
    ghGroup.userData = { type: "crop", zone: "zone-c" };
    farmRoot.add(ghGroup);

    const ghGlass = new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 3.5, 7.8, 16, 1, false, 0, Math.PI),
      new THREE.MeshPhysicalMaterial({
        color: 0x67f5c2,
        transparent: true,
        opacity: 0.32,
        roughness: 0.1,
        transmission: 0.9,
      })
    );
    ghGlass.rotation.z = Math.PI / 2;
    ghGlass.rotation.y = Math.PI / 2;
    ghGlass.position.y = 2.8;
    ghGroup.add(ghGlass);

    // ==========================================
    // 11. CENTRAL "AGRI AI CORE" HOLOGRAPHIC ENGINE
    // ==========================================
    const aiCoreGroup = new THREE.Group();
    aiCoreGroup.position.set(0, 1.8, 0);
    aiCoreGroup.userData = { type: "aicore" };
    farmRoot.add(aiCoreGroup);
    interactiveObjectsRef.current["aicore"] = aiCoreGroup;

    // Glowing Central Nucleus
    const coreSphereGeo = new THREE.SphereGeometry(0.75, 24, 24);
    const coreSphereMat = new THREE.MeshStandardMaterial({
      color: 0x00d084,
      emissive: 0x00d084,
      emissiveIntensity: 1.2,
      roughness: 0.2,
    });
    const coreSphere = new THREE.Mesh(coreSphereGeo, coreSphereMat);
    aiCoreGroup.add(coreSphere);
    aiCoreSphereRef.current = coreSphere;

    const coreLight = new THREE.PointLight(0x00d084, 2.5, 12);
    aiCoreGroup.add(coreLight);

    // 3 Concentric Gimbal Rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x67f5c2,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const rings = [];
    [1.4, 1.85, 2.3].forEach((radius, idx) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.04, 8, 36), ringMat);
      ring.rotation.x = Math.PI / 3 * idx;
      ring.rotation.y = Math.PI / 4 * idx;
      aiCoreGroup.add(ring);
      rings.push(ring);
    });
    aiCoreRingsRef.current = rings;

    // ==========================================
    // 12. GLOWING NEURAL DATA LINES (CONNECTING TO CORE)
    // ==========================================
    const connections = [
      [-9.5, 0.5, -1],   // Solar
      [-3.5, 0.5, -3.5], // Soil sensor
      [-8.5, 0.5, 8.5],  // Water reservoir
      [8.5, 0.5, -8.5],  // Wheat Plot A
      [8.5, 0.5, 8.5],   // Greenhouse
      [12, 0.5, 0],      // Weather station
    ];

    const dataSplines = [];
    connections.forEach(([cx, cy, cz]) => {
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(cx, cy + 0.5, cz),
        new THREE.Vector3(cx / 2, 3.2, cz / 2),
        new THREE.Vector3(0, 1.8, 0)
      );

      const points = curve.getPoints(30);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00d084,
        transparent: true,
        opacity: 0.45,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      farmRoot.add(line);
      dataSplines.push({ line, curve });
    });
    pipeBeamsRef.current = dataSplines;

    // Floating Data Stream Particles
    const pCount = 180;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pProgress = [];

    for (let i = 0; i < pCount; i++) {
      const connIdx = i % connections.length;
      pProgress.push({
        connIdx,
        t: Math.random(),
        speed: 0.006 + Math.random() * 0.008,
      });
      const pt = connections[connIdx];
      pPos[i * 3] = pt[0];
      pPos[i * 3 + 1] = pt[1];
      pPos[i * 3 + 2] = pt[2];
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x67f5c2,
      size: 0.25,
      transparent: true,
      opacity: 0.85,
    });
    const pSystem = new THREE.Points(pGeo, pMat);
    farmRoot.add(pSystem);
    dataParticlesRef.current = { points: pSystem, pos: pPos, progress: pProgress };

    // ==========================================
    // 13. WEATHER STATION WITH SPINNING ANEMOMETER
    // ==========================================
    const weatherGroup = new THREE.Group();
    weatherGroup.position.set(12, 0, 0);
    weatherGroup.userData = { type: "weather" };
    farmRoot.add(weatherGroup);
    interactiveObjectsRef.current["weather"] = weatherGroup;

    const weatherTower = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.2, 5, 8),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 })
    );
    weatherTower.position.y = 2.5;
    weatherTower.castShadow = true;
    weatherTower.userData = { type: "weather" };
    weatherGroup.add(weatherTower);

    // Anemometer cross
    const anemometer = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.06, 0.06),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b })
    );
    anemometer.position.y = 5.1;
    weatherGroup.add(anemometer);

    // ==========================================
    // 14. WIND TURBINE
    // ==========================================
    const turbineGroup = new THREE.Group();
    turbineGroup.position.set(-13, 0, -12);
    farmRoot.add(turbineGroup);

    const mast = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.45, 9.5, 8),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4, metalness: 0.5 })
    );
    mast.position.y = 4.75;
    mast.castShadow = true;
    turbineGroup.add(mast);

    const blades = new THREE.Group();
    blades.position.set(0, 9.5, 0.8);
    turbineGroup.add(blades);
    windBladesRef.current = blades;

    for (let b = 0; b < 3; b++) {
      const blade = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 3.8, 0.05),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
      );
      blade.geometry.translate(0, 1.9, 0);
      blade.rotation.z = (b * Math.PI * 2) / 3;
      blade.castShadow = true;
      blades.add(blade);
    }

    // ==========================================
    // 15. SPRINKLER WATER PARTICLES
    // ==========================================
    const spCount = 400;
    const spGeo = new THREE.BufferGeometry();
    const spPos = new Float32Array(spCount * 3);
    const spVel = [];

    for (let i = 0; i < spCount; i++) {
      spPos[i * 3] = -8.5;
      spPos[i * 3 + 1] = 0.5;
      spPos[i * 3 + 2] = 8.5;

      const angle = Math.random() * Math.PI * 2;
      const speed = 0.08 + Math.random() * 0.12;
      spVel.push({
        vx: Math.cos(angle) * speed,
        vy: 0.12 + Math.random() * 0.12,
        vz: Math.sin(angle) * speed,
      });
    }
    spGeo.setAttribute("position", new THREE.BufferAttribute(spPos, 3));
    const spPoints = new THREE.Points(
      spGeo,
      new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.22,
        transparent: true,
        opacity: 0.9,
      })
    );
    spPoints.visible = false;
    farmRoot.add(spPoints);
    sprinklerPointsRef.current = { points: spPoints, pos: spPos, vel: spVel };

    // ==========================================
    // 16. RAIN PARTICLES
    // ==========================================
    const rainCount = 1200;
    const rainGeo = new THREE.BufferGeometry();
    const rainPos = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      rainPos[i * 3] = (Math.random() - 0.5) * 50;
      rainPos[i * 3 + 1] = Math.random() * 40;
      rainPos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    rainGeo.setAttribute("position", new THREE.BufferAttribute(rainPos, 3));
    const rainPoints = new THREE.Points(
      rainGeo,
      new THREE.PointsMaterial({ color: 0x67f5c2, size: 0.18, transparent: true, opacity: 0.7 })
    );
    rainPoints.visible = false;
    scene.add(rainPoints);
    rainRef.current = { points: rainPoints, pos: rainPos };

    // ==========================================
    // 17. 3D CLOUDS IN SKY
    // ==========================================
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0x1a3d30,
      roughness: 0.5,
      transparent: true,
      opacity: 0.65,
    });
    const cloudsList = [];
    for (let c = 0; c < 5; c++) {
      const cGroup = new THREE.Group();
      for (let b = 0; b < 4; b++) {
        const bl = new THREE.Mesh(new THREE.DodecahedronGeometry(2 + Math.random(), 1), cloudMat);
        bl.position.set(b * 1.8, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 1.2);
        cGroup.add(bl);
      }
      cGroup.position.set((Math.random() - 0.5) * 50, 18 + Math.random() * 4, (Math.random() - 0.5) * 50);
      scene.add(cGroup);
      cloudsList.push({ group: cGroup, speed: 0.012 + Math.random() * 0.015 });
    }
    cloudsRef.current = cloudsList;

    // ==========================================
    // 18. RAYCASTING / MOUSE INTERACTION
    // ==========================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Mouse Parallax factor
      mousePosRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };

      raycaster.setFromCamera(mouse, camera);
      const interactableMeshes = Object.values(interactiveObjectsRef.current);
      const intersects = raycaster.intersectObjects(interactableMeshes, true);

      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj && !obj.userData?.type) {
          obj = obj.parent;
        }
        if (obj?.userData?.type) {
          const type = obj.userData.type;
          setHoveredData(OBJECT_TELEMETRY[type] || null);
          setHoverScreenPos({ x: e.clientX, y: e.clientY });
          container.style.cursor = "pointer";
          return;
        }
      }
      setHoveredData(null);
      container.style.cursor = "default";
    };

    const handleClick = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const interactableMeshes = Object.values(interactiveObjectsRef.current);
      const intersects = raycaster.intersectObjects(interactableMeshes, true);

      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj && !obj.userData?.type) {
          obj = obj.parent;
        }
        if (obj?.userData?.type) {
          onSelectObject?.(obj.userData.type);
        }
      }
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("click", handleClick);

    // ==========================================
    // 19. ANIMATION LOOP & SMOOTH CAMERA LERP
    // ==========================================
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth Camera LERP to Target Stage
      if (isTransitioningRef.current) {
        camera.position.lerp(currentCameraTargetRef.current, 0.045);
        controls.target.lerp(currentLookAtRef.current, 0.045);

        // Apply subtle mouse parallax
        camera.position.x += mousePosRef.current.x * 0.015;
        camera.position.y += mousePosRef.current.y * 0.015;

        if (camera.position.distanceTo(currentCameraTargetRef.current) < 0.1) {
          isTransitioningRef.current = false;
        }
      } else {
        // Subtle idle parallax
        camera.position.x += (mousePosRef.current.x * 0.8 - (camera.position.x - currentCameraTargetRef.current.x)) * 0.02;
      }

      controls.update();

      // Spin AI Core rings in alternate directions
      if (aiCoreRingsRef.current.length > 0) {
        aiCoreRingsRef.current[0].rotation.z += 0.02;
        aiCoreRingsRef.current[1].rotation.x += 0.016;
        aiCoreRingsRef.current[2].rotation.y += 0.012;
      }
      if (aiCoreSphereRef.current) {
        const pulse = 1.0 + Math.sin(elapsed * 4) * 0.12;
        aiCoreSphereRef.current.scale.set(pulse, pulse, pulse);
      }

      // Wind turbine spin
      if (windBladesRef.current) {
        windBladesRef.current.rotation.z += 0.035;
      }

      // Clouds drifting
      cloudsRef.current.forEach((c) => {
        c.group.position.x += c.speed;
        if (c.group.position.x > 60) c.group.position.x = -60;
      });

      // Wheat sway in wind
      wheatRef.current.forEach((stalk) => {
        stalk.obj.rotation.z = Math.sin(elapsed * 2.5 + stalk.offset) * 0.08;
      });

      // Animate flowing data particles to AI Core
      if (dataParticlesRef.current && pipeBeamsRef.current.length > 0) {
        const { points, pos, progress } = dataParticlesRef.current;
        for (let i = 0; i < pCount; i++) {
          progress[i].t += progress[i].speed;
          if (progress[i].t > 1) progress[i].t = 0;

          const spline = pipeBeamsRef.current[progress[i].connIdx]?.curve;
          if (spline) {
            const pt = spline.getPoint(progress[i].t);
            pos[i * 3] = pt.x;
            pos[i * 3 + 1] = pt.y;
            pos[i * 3 + 2] = pt.z;
          }
        }
        points.geometry.attributes.position.needsUpdate = true;
      }

      // Rain particles if active
      if (rainRef.current && weatherMode === "rain") {
        rainRef.current.points.visible = true;
        const { pos, points } = rainRef.current;
        for (let r = 0; r < rainCount; r++) {
          pos[r * 3 + 1] -= 0.9;
          if (pos[r * 3 + 1] < 0) pos[r * 3 + 1] = 38 + Math.random() * 5;
        }
        points.geometry.attributes.position.needsUpdate = true;
      } else if (rainRef.current) {
        rainRef.current.points.visible = false;
      }

      // Sprinklers if active
      if (sprinklerPointsRef.current && sprinklersActive) {
        sprinklerPointsRef.current.points.visible = true;
        const { pos, vel, points } = sprinklerPointsRef.current;
        for (let i = 0; i < spCount; i++) {
          pos[i * 3] += vel[i].vx;
          pos[i * 3 + 1] += vel[i].vy;
          pos[i * 3 + 2] += vel[i].vz;
          vel[i].vy -= 0.007;

          if (pos[i * 3 + 1] <= 0.3) {
            pos[i * 3] = -8.5;
            pos[i * 3 + 1] = 0.5;
            pos[i * 3 + 2] = 8.5;
            const angle = elapsed * 3 + Math.random() * 1.5;
            const speed = 0.08 + Math.random() * 0.12;
            vel[i].vx = Math.cos(angle) * speed;
            vel[i].vy = 0.12 + Math.random() * 0.12;
            vel[i].vz = Math.sin(angle) * speed;
          }
        }
        points.geometry.attributes.position.needsUpdate = true;
      } else if (sprinklerPointsRef.current) {
        sprinklerPointsRef.current.points.visible = false;
      }

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameRef.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Layer Visibility dynamically
  useEffect(() => {
    if (!interactiveObjectsRef.current) return;
    if (interactiveObjectsRef.current["sensor"]) {
      interactiveObjectsRef.current["sensor"].visible = layers.soilMoisture;
    }
    if (interactiveObjectsRef.current["water"]) {
      interactiveObjectsRef.current["water"].visible = layers.irrigation;
    }
    if (interactiveObjectsRef.current["crop"]) {
      interactiveObjectsRef.current["crop"].visible = layers.cropHealth;
    }
    if (interactiveObjectsRef.current["weather"]) {
      interactiveObjectsRef.current["weather"].visible = layers.weather;
    }
    if (interactiveObjectsRef.current["solar"]) {
      interactiveObjectsRef.current["solar"].visible = layers.energy;
    }
  }, [layers]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Floating Holographic Tooltip on 3D Object Hover */}
      {hoveredData && (
        <div
          className="fixed pointer-events-none z-50 transition-all duration-150 ease-out"
          style={{
            left: `${hoverScreenPos.x + 16}px`,
            top: `${hoverScreenPos.y - 40}px`,
          }}
        >
          <div className="rounded-2xl glass-futuristic-dark p-3.5 border border-[#00D084]/40 shadow-neon-emerald min-w-[210px] backdrop-blur-xl animate-float">
            <div className="flex items-center justify-between gap-2 mb-1.5 border-b border-white/10 pb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#67F5C2] font-bold">
                {hoveredData.title}
              </span>
              <span className="h-2 w-2 rounded-full bg-[#00D084] animate-ping" />
            </div>
            <div className="text-sm font-display font-extrabold text-white">
              {hoveredData.line1}
            </div>
            <div className="text-xs text-white/70 mt-0.5">
              {hoveredData.line2}
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-white/50 pt-1 border-t border-white/5">
              <span>{hoveredData.status}</span>
              <span className="text-[#00D084] font-mono">CLICK TO INSPECT →</span>
            </div>
          </div>
        </div>
      )}

      {/* Loading Fallback Screen */}
      {!isLoaded && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#02130e]">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#00D084]/40 bg-[#00D084]/10 shadow-neon-emerald animate-pulse">
            <div className="h-8 w-8 rounded-full border-2 border-t-[#00D084] border-r-[#67F5C2] border-b-transparent border-l-transparent animate-spin" />
          </div>
          <p className="mt-4 font-display text-sm tracking-widest text-[#67F5C2] uppercase font-bold">
            Loading Digital Farm...
          </p>
          <span className="text-[10px] text-white/40 mt-1 font-mono">
            Initializing WebGL 3D Twin & Sensor Mesh
          </span>
        </div>
      )}
    </div>
  );
};
