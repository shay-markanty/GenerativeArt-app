(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))l(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&l(m)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();const q=4,F=256,V=-1,G=1.5,R=[{id:"levy-c",label:"Lévy C",description:"Two angled segments per step; folded peaks and overhangs.",parameter:{label:"Bend angle",min:15,max:50,step:.1,default:45,unit:"°",description:"Angle of each child segment from its parent. 45° gives the standard Lévy C curve; smaller angles open it out."},generator:[[0,0],[.5,.5],[1,0]]},{id:"koch",label:"Koch curve",description:"Four segments per step; triangular teeth like a snowflake edge.",parameter:{label:"Tooth angle",min:20,max:84,step:.1,default:60,unit:"°",description:"Tilt of the triangular tooth. All four children keep equal length and the endpoints stay fixed. 60° gives the standard Koch curve."},generator:[[0,0],[1/3,0],[.5,Math.sqrt(3)/6],[2/3,0],[1,0]]},{id:"quadratic-koch",label:"Quadratic Koch",description:"Five segments per step; square steps instead of triangular teeth.",parameter:{label:"Step height",min:.1,max:.5,step:.001,default:1/3,unit:"%",description:"Height relative to each parent segment. 33⅓% gives the standard square step; other heights make rectangular steps at every replacement."},generator:[[0,0],[1/3,0],[1/3,1/3],[2/3,1/3],[2/3,0],[1,0]]},{id:"minkowski",label:"Minkowski sausage",description:"Eight segments per step; opposing square turns and dense terraces.",parameter:{label:"Step height",min:.1,max:.4,step:.001,default:.25,unit:"%",description:"Height of both opposing turns relative to each parent segment. 25% gives the standard Minkowski curve; other heights make rectangular turns."},generator:[[0,0],[.25,0],[.25,.25],[.5,.25],[.5,0],[.5,-.25],[.75,-.25],[.75,0],[1,0]]}];function I(){return Object.fromEntries(R.map(e=>[e.id,e.parameter.default]))}function j(e,t){const s=R.find(a=>a.id===e);if(!s)throw new RangeError("Unknown fractal mode.");const l=t??s.parameter.default;if(!Number.isFinite(l)||l<s.parameter.min||l>s.parameter.max)throw new RangeError("Curve parameter is outside its supported range.");if(l===s.parameter.default)return s.generator;if(e==="levy-c")return[[0,0],[.5,.5*Math.tan(l*Math.PI/180)],[1,0]];if(e==="koch"){const a=l*Math.PI/180,r=1/(2+2*Math.cos(a));return[[0,0],[r,0],[.5,r*Math.sin(a)],[1-r,0],[1,0]]}return s.generator.map(([a,r])=>[a,r===0?0:Math.sign(r)*l])}function K(e,t="levy-c",s){if(!Number.isInteger(e)||e<1||e>q)throw new RangeError(`Fractal depth must be an integer from 1 to ${q}.`);const l=j(t,s);let a=[[0,0],[1,0]];for(let r=1;r<e;r++){const m=[a[0]];for(let y=1;y<a.length;y++){const[v,T]=a[y-1],[M,E]=a[y],S=M-v,d=E-T;for(let h=1;h<l.length-1;h++){const[o,n]=l[h];m.push([v+o*S-n*d,T+o*d+n*S])}m.push(a[y])}a=m}return a}function X(e){const{min:t,max:s,default:l}=R.find(r=>r.id===e).parameter,a=Array.from({length:17},(r,m)=>t+(s-t)*m/16);return a.some(r=>Math.abs(r-l)<1e-12)||a.push(l),a.sort((r,m)=>r-m)}function Y(e,t){if(t<=e[0])return 0;for(let s=1;s<e.length;s++)if(t<=e[s])return s-1+(t-e[s-1])/(e[s]-e[s-1]);return e.length-1}function H(e=!1){return{seed:104729,symmetry:8,fractalMode:"levy-c",layers:4,repetitions:3,warp:.3,edgeWeave:1,curveParameters:I(),autoPilotBaseCurveParameters:I(),autoPilotCurveTime:0,zoomSpeed:.035,rotationSpeed:.006,whirlpoolSpeed:.06,evolutionSpeed:.6,ringSize:.15,ringFrequency:1,ringVelocity:1,paletteHold:20,paletteBlend:8,palettePosition:0,palettePaused:e,quality:1.5,autoPilot:!1,autoPilotTime:0,autoPilotWeaveTime:0,autoPilotWhirlpoolTime:0,autoPilotBaseZoomSpeed:.035,autoPilotBaseRotationSpeed:.006,autoPilotBaseWhirlpoolSpeed:.06,autoPilotBaseEvolutionSpeed:.6,autoPilotBaseWarp:.3,autoPilotBaseEdgeWeave:1,autoPilotBaseRingSize:.15,autoPilotBaseRingFrequency:1,autoPilotBaseRingVelocity:1,cameraPaused:e,evolutionPaused:e,zoom:0,rotation:0,whirlpool:0,evolution:0,rippleTime:0}}function Z(e){const t=Math.sin(e*3);return .85*t*t*t}function Q(e,t){if(!e.palettePaused){const s=Math.floor(e.palettePosition),l=e.palettePosition-s,a=e.paletteHold+e.paletteBlend,r=(l<.5?l*2*e.paletteHold:e.paletteHold+(l*2-1)*e.paletteBlend)+t,m=Math.floor(r/a),y=r-m*a,v=y<e.paletteHold?y/e.paletteHold*.5:.5+(y-e.paletteHold)/e.paletteBlend*.5;e.palettePosition=s+m+v}if(e.autoPilot&&(!e.cameraPaused||!e.evolutionPaused)){e.autoPilotTime+=t;const s=e.autoPilotTime;if(e.zoomSpeed=Math.round(Math.min(.2,.02+e.autoPilotBaseZoomSpeed*(.65+.35*Math.sin(s*.31)))*1e3)/1e3,e.rotationSpeed=Math.round(Math.max(-.08,Math.min(.08,e.autoPilotBaseRotationSpeed+.012*Math.sin(s*.43)))*1e3)/1e3,e.evolutionSpeed=Math.round(Math.min(2,.15+e.autoPilotBaseEvolutionSpeed*(.6+.4*Math.sin(s*.23)))*100)/100,!e.cameraPaused){e.autoPilotWhirlpoolTime+=t;const l=.5-.5*Math.cos(e.autoPilotWhirlpoolTime*.12),a=e.autoPilotBaseWhirlpoolSpeed;e.whirlpoolSpeed=(a<0?-1:1)*(Math.abs(a)*(1-l)+.075*l)}if(!e.evolutionPaused){e.autoPilotWeaveTime+=t,e.autoPilotCurveTime+=t,e.curveParameters={...e.curveParameters},R.forEach((a,r)=>{const{min:m,max:y}=a.parameter,v=(e.autoPilotBaseCurveParameters[a.id]-m)/(y-m),T=Math.acos(Math.max(-1,Math.min(1,2*v-1)));e.curveParameters[a.id]=m+(y-m)*(.5+.5*Math.cos(e.autoPilotCurveTime*(.11+r*.017)+T))});const l=Math.acos(2*e.autoPilotBaseEdgeWeave-1);e.edgeWeave=.5+.5*Math.cos(e.autoPilotWeaveTime*.14+l),e.warp=Math.round(Math.max(0,Math.min(1,e.autoPilotBaseWarp+.28*Math.sin(s*.37)))*100)/100,e.ringSize=Math.round(Math.max(.05,Math.min(.3,e.autoPilotBaseRingSize+.08*Math.sin(s*.29)))*1e3)/1e3,e.ringFrequency=Math.round(Math.max(.25,Math.min(2.5,e.autoPilotBaseRingFrequency*(1+.5*Math.sin(s*.19))))*100)/100,e.ringVelocity=Math.round(Math.max(-1,Math.min(1,e.autoPilotBaseRingVelocity*Math.cos(s*.17)+.55*Math.sin(s*.31)))*100)/100}}e.cameraPaused||(e.zoom+=t*e.zoomSpeed,e.rotation+=t*e.rotationSpeed,e.whirlpool+=t*e.whirlpoolSpeed),e.evolutionPaused||(e.evolution+=t*e.evolutionSpeed,e.rippleTime+=t*e.evolutionSpeed*e.ringFrequency*e.ringVelocity)}function J(e){let t=e>>>0;return Float32Array.from({length:4},()=>{t=t+1831565813|0;let s=Math.imul(t^t>>>15,1|t);return s^=s+Math.imul(s^s>>>7,61|s),((s^s>>>14)>>>0)/4294967296*Math.PI*2})}const ee=`#version 300 es
// One oversized triangle covers the viewport without a diagonal seam or buffers.
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`,te=`#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_zoom;
uniform float u_rotation;
uniform float u_whirlpool;
uniform float u_evolution;
uniform float u_rippleTime;
uniform float u_ringSize;
uniform vec4 u_phases;
uniform float u_symmetry;
uniform int u_layers;
uniform float u_curveLayer;
uniform int u_repetitions;
uniform highp sampler2DArray u_fractalField;
uniform vec2 u_fieldYBounds;
uniform float u_warp;
uniform float u_edgeWeave;
uniform vec3 u_ground;
uniform vec3 u_primary;
uniform vec3 u_secondary;
uniform vec3 u_highlight;
uniform vec3 u_accent;
out vec4 fragColor;

const float TAU = 6.28318530718;

// Screen-space units: 1.0 is half the viewport's shorter side.
const float RIPPLE_MAX_WIDTH = 0.60;
const float RIPPLE_STRENGTH = 0.60; // Displacement relative to band width.
const float RIPPLE_BRIGHTNESS = 0.65; // Extra linear exposure at the band's center.
const float RIPPLE_SPEED = 0.38; // Radius per evolution unit; 0.228/second at default speed.
const float RIPPLE_GAP = 0.30; // Clear radial travel between maximum-width rings.
const float EDGE_WEAVE_START = 0.35;
const float EDGE_WEAVE_PERIOD = 1.30;

float whirlpoolAngle(float angle, float radius) {
  float r2 = radius * radius;
  // Smooth radial twist weight: 20% at the center, 60% at radius 1,
  // approaching 100% farther out. The zero center slope avoids a singularity.
  float speed = 0.20 + 0.80 * r2 / (1.0 + r2);
  // Inverse sampling: adding an angle moves visible features clockwise.
  return angle + u_whirlpool * speed;
}

float edgeCoordinate(float foldedAngle, float radius, float amount) {
  // The original spoke v=0 splits into two axes at v=split. At split=1
  // each arm meets the matching arm of the neighboring wedge at its boundary.
  // Reversing that travel farther out makes linked arches instead of long rays.
  float outward = max(radius - EDGE_WEAVE_START, 0.0);
  float split = amount * (0.5 - 0.5 * cos(TAU * outward / EDGE_WEAVE_PERIOD));
  return abs(foldedAngle - split);
}

float lensFocus(float bandPosition) {
  float envelope = max(1.0 - bandPosition * bandPosition, 0.0);
  // Compact, symmetric highlight with zero slope at the center and both edges.
  return envelope * envelope * envelope;
}

// x: refracted radius; y: focused light, using the very same band and travel.
vec2 rippleLens(float radius) {
  float width = u_ringSize * 2.0;
  float halfWidth = width * 0.5;
  float cornerRadius = length(u_resolution / min(u_resolution.x, u_resolution.y));
  // GLSL mod keeps negative travel periodic too, so inward motion retraces outward motion.
  // Wrap only the ripple's travel, after its trailing edge clears every corner.
  // Reserve the maximum width, so resizing a band cannot shift its center or wrap it.
  float travel = cornerRadius + RIPPLE_MAX_WIDTH + RIPPLE_GAP;
  float ringRadius = mod(u_rippleTime * RIPPLE_SPEED, travel) - RIPPLE_MAX_WIDTH * 0.5;
  float x = clamp((radius - ringRadius) / halfWidth, -1.0, 1.0);
  float focus = lensFocus(x);
  // Odd slope of a smooth bump: opposite refraction on the two sides,
  // with zero displacement and slope at both boundaries of the annulus.
  float displacement = RIPPLE_STRENGTH * width * x * focus;
  float launch = smoothstep(0.0, halfWidth, ringRadius);
  return vec2(radius + displacement * launch, focus * launch);
}

float ink(float distanceToLine, float width, float aa) {
  return 1.0 - smoothstep(width, width + aa, abs(distanceToLine));
}

float smoothMin(float a, float b, float radius) {
  float h = max(radius - abs(a - b), 0.0) / radius;
  return min(a, b) - h * h * radius * 0.25;
}

float fractalContour(float phase, float threshold, float v) {
  float base = abs(cos(phase)) - threshold;
  if (u_layers == 1) return base;
  // A local chart around each arch: horizontal is progress along the arch;
  // vertical is distance from its original zero contour in radial phase.
  float halfPeriod = TAU * 0.5;
  float foldedPhase = mod(phase + halfPeriod * 0.5, halfPeriod) - halfPeriod * 0.5;
  float root = acos(clamp(threshold, 0.001, 0.999));
  float normal = (root - abs(foldedPhase)) / 0.70;
  vec2 uv = vec2(v, (normal - u_fieldYBounds.x) / (u_fieldYBounds.y - u_fieldYBounds.x));
  vec2 texel = 1.0 / vec2(textureSize(u_fractalField, 0).xy);
  uv = clamp(uv, 0.0, 1.0) * (1.0 - texel) + texel * 0.5;
  // Distance to the actual final polyline, not a sum of little displacements.
  float layer = floor(u_curveLayer);
  float lower = texture(u_fractalField, vec3(uv, layer)).r;
  float upper = texture(u_fractalField, vec3(uv, min(layer + 1.0, float(textureSize(u_fractalField, 0).z - 1)))).r;
  float refined = mix(lower, upper, fract(u_curveLayer)) * 0.70 * sin(root);
  // Fade the fractal out when even its coarse segments are subpixel.
  float resolved = 1.0 - smoothstep(0.15, 0.50, max(fwidth(v), fwidth(normal)));
  return mix(base, refined, resolved);
}

void main() {
  vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / min(u_resolution.x, u_resolution.y);
  float radius = length(p);
  // Finite center; derivatives below fade subpixel detail instead of aliasing it.
  float minRadius = 1.5 / min(u_resolution.x, u_resolution.y);
  float angle = (radius < 0.000001 ? 0.0 : atan(p.y, p.x)) - u_rotation;
  // Twist the signed angle before mirroring; radius alone sets the offset,
  // so every wedge still repeats exactly. Mirror axes become curved spirals.
  angle = whirlpoolAngle(angle, radius);
  float wedge = TAU / u_symmetry;
  float folded = abs(mod(angle + wedge * 0.5, wedge) - wedge * 0.5);
  // Refract the folded radial coordinate before evaluating any ornament, so
  // the whole pattern bends while angular symmetry and the outer field stay intact.
  vec2 lens = rippleLens(radius);
  float refractedRadius = max(lens.x, minRadius);
  // Apply after angular folding to preserve every selected symmetry boundary.
  // Use the refracted radius so the moving lens bends the weave as well.
  float v = edgeCoordinate(folded / (wedge * 0.5), refractedRadius, u_edgeWeave);
  // Subtracting unwrapped zoom makes features expand outward as the camera travels inward.
  float u = log(refractedRadius) - u_zoom;
  float t = u_evolution;
  float breath = sin(t * 0.113 + u_phases.x);
  u += u_warp * (0.16 * cos(v * 3.14159265) * sin(2.0 * u + u_phases.w)
       + 0.11 * breath * cos(v * TAU));

  vec3 color = u_ground;
  float relief = 0.0;
  // One evolving motif, with independent fractal depth and copy count.
  float cycle = t * 0.50 + u_phases.x + u * 0.10;
  float scaleForm = 0.5 + 0.5 * sin(u * 0.28 + u_phases.z + u_phases.x * 0.37);
  float petals = 0.5 + 0.5 * sin(cycle);
  float branching = 0.5 + 0.5 * sin(cycle + 2.0943951
    + 0.2 * sin(u * 0.17 + u_phases.w));
  float archDepth = mix(0.30, 0.94, 0.5 + 0.5 * sin(cycle * 0.72 + u_phases.z));
  // Keep the root radial structure aperiodic and zoom unwrapped.
  float radialPhase = u + 0.46 * sin(u * 0.41421356 + u_phases.x)
    + 0.22 * sin(u * 0.7320508 + u_phases.w);
  vec2 q = vec2(radialPhase, v);
  for (int i = 0; i < 7; i++) {
    if (i >= u_repetitions) break;
    float profile = mix(cos(q.y * 3.14159265), cos(q.y * TAU), petals)
      + branching * 0.22 * sin(q.y * 9.42477796 + u_phases.y);
    float archShape = fractalContour(q.x + archDepth * profile,
      mix(0.62, 0.82, scaleForm) - 0.56 * pow(q.y, 1.6), q.y);
    float branchPhase = q.x * (0.48 + 0.12 * scaleForm)
      - archDepth * (profile + 0.34 * sin(q.y * 9.42477796 + u_phases.y));
    float branchShape = fractalContour(branchPhase, 0.62 - 0.30 * pow(q.y, 1.3), q.y);
    float windowShape = mix(archShape, smoothMin(archShape, branchShape, 0.12), branching);
    float aa = max(fwidth(windowShape), 0.0015);
    float footprint = max(fwidth(q.x), fwidth(q.y));
    float resolved = 1.0 - smoothstep(0.35, 1.4, footprint);
    float edge = ink(windowShape, 0.018, aa) * resolved;
    float innerEdge = ink(windowShape + 0.10, 0.009, aa) * resolved;
    float fill = (1.0 - smoothstep(-0.18, 0.08, windowShape)) * resolved;
    float glow = exp(-abs(windowShape) * 13.0) * resolved;
    vec3 enamel = mix(u_primary, u_secondary, 0.5 + 0.5 * sin(q.x + u_phases.x));
    float weight = pow(0.62, float(i));
    color += weight * (enamel * fill * 0.3 + u_highlight * edge * 0.68
      + u_accent * innerEdge * 0.35 + u_highlight * glow * 0.055);
    relief += weight * fill;
    q = vec2(q.x * 2.0 + archDepth * profile + breath * 0.12, abs(q.y * 2.0 - 1.0));
  }

  // Symmetry-preserving shading; no fixed-direction screen-space light.
  color *= 0.75 + 0.25 * cos(v * 3.14159265) + 0.15 * relief;
  color += u_primary * 0.1 * pow(0.5 + 0.5 * cos(u * 2.0), 5.0);
  color *= smoothstep(0.001, 0.018, radius);
  color *= 1.0 / (1.0 + 0.16 * radius * radius);
  // Lift the ornament's own colors, strongest along the middle of the annulus.
  // Apply before tone mapping to keep bright enamel from turning into a flat rim.
  color *= 1.0 + RIPPLE_BRIGHTNESS * lens.y;
  color = 1.0 - exp(-color * 1.6);
  color = pow(color, vec3(0.85));
  fragColor = vec4(color, 1.0);
}
`,k=[{name:"Ember / Cobalt",colors:[.013,.025,.071,.035,.15,.43,.55,.075,.045,1,.67,.29,.32,.57,.85]},{name:"Jade / Copper",colors:[.012,.038,.031,.025,.34,.23,.62,.2,.07,1,.75,.42,.42,.88,.7]},{name:"Violet / Pearl",colors:[.028,.016,.063,.21,.065,.42,.55,.1,.29,.89,.78,1,.36,.68,.9]},{name:"Crimson / Ice",colors:[.044,.013,.028,.37,.035,.1,.035,.26,.39,.63,.91,1,1,.43,.34]},{name:"Arctic / Silver",colors:[.014,.03,.048,.055,.23,.38,.18,.34,.43,.82,.95,1,.38,.78,.91]},{name:"Lagoon / Coral",colors:[.01,.036,.043,.015,.34,.38,.72,.15,.12,1,.65,.48,.3,.91,.82]},{name:"Moss / Citrine",colors:[.022,.032,.012,.12,.27,.035,.38,.25,.045,.87,1,.28,.51,.77,.37]},{name:"Plum / Saffron",colors:[.041,.014,.043,.31,.045,.29,.66,.25,.025,1,.83,.2,.81,.39,.71]},{name:"Rose / Graphite",colors:[.026,.023,.03,.32,.1,.19,.16,.2,.27,1,.65,.77,.65,.76,.87]},{name:"Amber / Obsidian",colors:[.023,.019,.015,.29,.13,.025,.46,.055,.018,1,.78,.35,.91,.48,.14]}];function N(e){const t=Math.floor(e),s=(t%k.length+k.length)%k.length,l=(s+1)%k.length,a=Math.max(0,(e-t)*2-1),r=a*a*a*(a*(a*6-15)+10);return{from:s,to:l,blend:r}}function ae(e,t){const{from:s,to:l,blend:a}=N(e);for(let r=0;r<15;r++){const m=k[s].colors[r];t[r]=m+(k[l].colors[r]-m)*a}}function oe(e){const t=e.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1,stencil:!1});if(!t)throw new Error("WebGL2 is unavailable. Try a current Edge, Chrome, or Firefox browser with hardware acceleration enabled.");function s(i,w){const x=t.createShader(i);if(!x)throw new Error("Could not allocate a shader.");if(t.shaderSource(x,w),t.compileShader(x),!t.getShaderParameter(x,t.COMPILE_STATUS)){const P=t.getShaderInfoLog(x);throw t.deleteShader(x),new Error(`Shader compilation failed:
${P}`)}return x}const l=s(t.VERTEX_SHADER,ee),a=s(t.FRAGMENT_SHADER,te),r=t.createProgram();if(!r)throw new Error("Could not allocate a shader program.");if(t.attachShader(r,l),t.attachShader(r,a),t.linkProgram(r),t.deleteShader(l),t.deleteShader(a),!t.getProgramParameter(r,t.LINK_STATUS))throw new Error(`Shader link failed:
${t.getProgramInfoLog(r)}`);t.useProgram(r);const m=t.createVertexArray();t.bindVertexArray(m);const v=Object.fromEntries(["resolution","zoom","rotation","whirlpool","evolution","rippleTime","ringSize","phases","symmetry","layers","curveLayer","repetitions","warp","edgeWeave"].map(i=>[i,t.getUniformLocation(r,`u_${i}`)])),M=["ground","primary","secondary","highlight","accent"].map(i=>t.getUniformLocation(r,`u_${i}`)),E=new Float32Array(15),S=t.createTexture();if(!S)throw new Error("Could not allocate the fractal distance field.");t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D_ARRAY,S),t.texParameteri(t.TEXTURE_2D_ARRAY,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D_ARRAY,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D_ARRAY,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D_ARRAY,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const d=new Map,h=new Map(R.map(i=>[i.id,X(i.id)])),o=new Worker(new URL(""+new URL("fractal-worker-D8ffHVeO.js",import.meta.url).href,import.meta.url),{type:"module"});let n="",c=!1,p;o.onmessage=i=>{if(c=!1,i.data.error){p=new Error(i.data.error);return}for(d.set(`${i.data.mode}:${i.data.depth}`,i.data.field);d.size>4;)d.delete(d.keys().next().value)},o.onerror=i=>{p=new Error(`Curve preparation failed: ${i.message}`)};function u(i){if(p)throw p;const w=`${i.fractalMode}:${i.layers}`;if(w===n)return!0;const x=d.get(w);if(!x)return c||(c=!0,o.postMessage({mode:i.fractalMode,depth:i.layers})),!1;d.delete(w),d.set(w,x),t.texImage3D(t.TEXTURE_2D_ARRAY,0,t.R16F,F,F,x.length/(F*F),0,t.RED,t.FLOAT,x);const P=t.getError();if(P!==t.NO_ERROR)throw new Error(`Fractal distance field upload failed (WebGL error ${P}).`);return n=w,!0}t.uniform1i(t.getUniformLocation(r,"u_fractalField"),0),t.uniform2f(t.getUniformLocation(r,"u_fieldYBounds"),V,G);let b=-1;const f=t.getParameter(t.MAX_VIEWPORT_DIMS);return{prepare:u,draw(i){const w=i.quality,x=Math.min(1,Math.sqrt(4e6/(innerWidth*innerHeight*w*w))),P=Math.max(1,Math.min(f[0],Math.round(innerWidth*w*x))),A=Math.max(1,Math.min(f[1],Math.round(innerHeight*w*x)));(e.width!==P||e.height!==A)&&(e.width=P,e.height=A,t.viewport(0,0,P,A)),t.uniform2f(v.resolution,P,A),t.uniform1f(v.zoom,i.zoom),t.uniform1f(v.rotation,i.rotation%(Math.PI*2)),t.uniform1f(v.whirlpool,Z(i.whirlpool)),t.uniform1f(v.evolution,i.evolution),t.uniform1f(v.rippleTime,i.rippleTime),t.uniform1f(v.ringSize,i.ringSize),t.uniform1f(v.symmetry,i.symmetry),t.uniform1i(v.layers,i.layers),t.uniform1f(v.curveLayer,i.layers===1?0:Y(h.get(i.fractalMode),i.curveParameters[i.fractalMode])),t.uniform1i(v.repetitions,i.repetitions),t.uniform1f(v.warp,i.warp),t.uniform1f(v.edgeWeave,i.edgeWeave),ae(i.palettePosition,E);for(let L=0;L<M.length;L++)t.uniform3f(M[L],E[L*3],E[L*3+1],E[L*3+2]);i.seed!==b&&(t.uniform4fv(v.phases,J(i.seed)),b=i.seed),t.drawArrays(t.TRIANGLES,0,3)},dispose(){o.terminate(),d.clear(),t.deleteTexture(S),t.deleteVertexArray(m),t.deleteProgram(r)}}}function g(e){const t=document.getElementById(e);if(!t)throw new Error(`Missing interface element: ${e}`);return t}function ne(e,t){const s=new AbortController,l={signal:s.signal},a=g("curve-parameter");a.addEventListener("input",()=>{if(e.autoPilot)return;const o=R.find(n=>n.id===e.fractalMode);Number.isFinite(a.valueAsNumber)&&(e.curveParameters[o.id]=Math.max(o.parameter.min,Math.min(o.parameter.max,a.valueAsNumber))),r()},l);function r(){const{parameter:o}=R.find(c=>c.id===e.fractalMode),n=e.curveParameters[e.fractalMode];a.min=String(o.min),a.max=String(o.max),a.step="any",a.value=String(n),a.disabled=e.autoPilot,g("curve-parameter-label").textContent=o.label,g("curve-parameter-value").value=o.unit==="°"?`${n.toFixed(1)}°`:`${(n*100).toFixed(1)}%`,g("curve-parameter-note").textContent=o.description+(e.layers===1?" Choose depth 2 or higher to see its effect.":"")+(e.autoPilot?" Auto pilot controls this value; Pause evolution holds it.":"")}const m=g("fractal-mode");m.innerHTML=R.map(o=>`<option value="${o.id}">${o.label}</option>`).join(""),m.addEventListener("change",()=>{const o=R.find(n=>n.id===m.value);o&&(e.fractalMode=o.id),d()},l);const y=[["zoom-speed","zoomSpeed",3],["evolution-speed","evolutionSpeed",2],["rotation-speed","rotationSpeed",3],["symmetry","symmetry",0],["whirlpool-speed","whirlpoolSpeed",3],["layers","layers",0],["warp","warp",2],["repetitions","repetitions",0],["edge-weave","edgeWeave",2],["ring-size","ringSize",3],["ring-frequency","ringFrequency",2],["ring-velocity","ringVelocity",2],["palette-hold","paletteHold",0],["palette-blend","paletteBlend",0]],v=new Set(["zoomSpeed","rotationSpeed","whirlpoolSpeed","evolutionSpeed","warp","edgeWeave","ringSize","ringFrequency","ringVelocity"]),T=(o,n)=>o==="whirlpoolSpeed"?`${e[o]>0?"+":""}${e[o].toFixed(n)} rad/s`:o==="paletteHold"||o==="paletteBlend"?`${e[o].toFixed(n)} s`:o==="ringSize"?`${(e[o]*100).toFixed(1)}%`:o==="edgeWeave"?`${(e[o]*100).toFixed(0)}%`:o==="ringVelocity"?`${e[o]>0?"+":""}${e[o].toFixed(n)}`:o==="ringFrequency"?`${e[o].toFixed(n)}×`:e[o].toFixed(n);for(const[o,n,c]of y){const p=g(o);p.addEventListener("input",()=>{e[n]=p.valueAsNumber,e.autoPilot&&(n==="zoomSpeed"&&(e.autoPilotBaseZoomSpeed=e.zoomSpeed),n==="rotationSpeed"&&(e.autoPilotBaseRotationSpeed=e.rotationSpeed),n==="whirlpoolSpeed"&&(e.autoPilotBaseWhirlpoolSpeed=e.whirlpoolSpeed),n==="evolutionSpeed"&&(e.autoPilotBaseEvolutionSpeed=e.evolutionSpeed),n==="warp"&&(e.autoPilotBaseWarp=e.warp),n==="edgeWeave"&&(e.autoPilotBaseEdgeWeave=e.edgeWeave),n==="ringSize"&&(e.autoPilotBaseRingSize=e.ringSize),n==="ringFrequency"&&(e.autoPilotBaseRingFrequency=e.ringFrequency),n==="ringVelocity"&&(e.autoPilotBaseRingVelocity=e.ringVelocity)),d()},l),g(`${o}-value`).value=T(n,c)}const M=[["zoom-position","zoom"],["rotation-position","rotation"],["whirlpool-position","whirlpool"],["evolution-position","evolution"],["ripple-position","rippleTime"],["palette-position","palettePosition"]];for(const[o,n]of[...M,["seed","seed"]]){const c=g(o);c.addEventListener("input",()=>{c.checkValidity()&&Number.isFinite(c.valueAsNumber)&&(e[n]=c.valueAsNumber)},l),c.addEventListener("change",()=>{if(!c.checkValidity()||!Number.isFinite(c.valueAsNumber)){c.value=String(e[n]);return}e[n]=c.valueAsNumber},l)}g("quality").addEventListener("change",o=>{e.quality=Number(o.target.value)},l),g("camera-pause").addEventListener("click",()=>{e.cameraPaused=!e.cameraPaused,d()},l),g("evolution-pause").addEventListener("click",()=>{e.evolutionPaused=!e.evolutionPaused,d()},l),g("palette-pause").addEventListener("click",()=>{e.palettePaused=!e.palettePaused,d()},l),g("auto-pilot").addEventListener("click",()=>{e.autoPilot?(e.curveParameters={...e.autoPilotBaseCurveParameters},e.autoPilot=!1,e.zoomSpeed=e.autoPilotBaseZoomSpeed,e.rotationSpeed=e.autoPilotBaseRotationSpeed,e.whirlpoolSpeed=e.autoPilotBaseWhirlpoolSpeed,e.evolutionSpeed=e.autoPilotBaseEvolutionSpeed,e.warp=e.autoPilotBaseWarp,e.edgeWeave=e.autoPilotBaseEdgeWeave,e.ringSize=e.autoPilotBaseRingSize,e.ringFrequency=e.autoPilotBaseRingFrequency,e.ringVelocity=e.autoPilotBaseRingVelocity):(e.autoPilotBaseCurveParameters={...e.curveParameters},e.autoPilotCurveTime=0,e.autoPilotBaseZoomSpeed=e.zoomSpeed,e.autoPilotBaseRotationSpeed=e.rotationSpeed,e.autoPilotBaseWhirlpoolSpeed=e.whirlpoolSpeed,e.autoPilotBaseEvolutionSpeed=e.evolutionSpeed,e.autoPilotBaseWarp=e.warp,e.autoPilotBaseEdgeWeave=e.edgeWeave,e.autoPilotBaseRingSize=e.ringSize,e.autoPilotBaseRingFrequency=e.ringFrequency,e.autoPilotBaseRingVelocity=e.ringVelocity,e.autoPilotTime=0,e.autoPilotWeaveTime=0,e.autoPilotWhirlpoolTime=0,e.cameraPaused=!1,e.evolutionPaused=!1,e.palettePaused=!1,e.autoPilot=!0),d()},l),g("reset").addEventListener("click",()=>{t(),d()},l);const E=()=>{const o=g("controls");o.hidden=!o.hidden,g("toggle-panel").setAttribute("aria-expanded",String(!o.hidden)),g("menu-toggle-label").textContent=`${o.hidden?"Show":"Hide"} menu`};g("toggle-panel").addEventListener("click",E,l);const S=async()=>{try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch{g("status").textContent="Fullscreen unavailable in this browser"}};g("fullscreen").addEventListener("click",S,l),window.addEventListener("keydown",o=>{var n;if(!((n=document.getElementById("math-guide"))!=null&&n.open)&&!(o.target instanceof HTMLElement&&(o.target.matches("input, select, textarea, button, summary")||o.target.isContentEditable))&&!(o.repeat||o.ctrlKey||o.altKey||o.metaKey)){if(o.code==="Space"){o.preventDefault();const c=!(e.cameraPaused&&e.evolutionPaused&&e.palettePaused);e.cameraPaused=c,e.evolutionPaused=c,e.palettePaused=c,d()}o.key.toLowerCase()==="h"&&E(),o.key.toLowerCase()==="f"&&S()}},l);function d(){r(),m.value=e.fractalMode,g("fractal-mode-note").textContent=R.find(n=>n.id===e.fractalMode).description;for(const[n,c,p]of y){const u=g(n);u.value=String(e[c]),u.disabled=e.autoPilot&&v.has(c),g(`${n}-value`).value=T(c,p)}for(const[n,c]of[...M,["seed","seed"]]){const p=g(n);document.activeElement!==p&&(p.value=String(e[c]))}g("quality").value=String(e.quality);const o=g("auto-pilot");o.textContent=e.autoPilot?"Stop auto pilot":"Auto pilot",o.setAttribute("aria-pressed",String(e.autoPilot)),g("motion-control-note").hidden=!e.autoPilot;for(const[n,c,p]of[["camera-pause",e.cameraPaused,"camera"],["evolution-pause",e.evolutionPaused,"evolution"],["palette-pause",e.palettePaused,"colors"]]){const u=g(n);u.textContent=`${c?"Resume":"Pause"} ${p}`,u.setAttribute("aria-pressed",String(c))}h()}function h(){const{from:o,to:n,blend:c}=N(e.palettePosition),p=c>0?`${k[o].name} → ${k[n].name} · ${Math.round(c*100)}%`:k[o].name;g("palette-status").textContent=p,g("palette-caption").textContent=p.toUpperCase()}return d(),{dispose(){s.abort()},syncMotionSliders(){r();for(const[o,n,c]of y){if(!v.has(n))continue;const p=g(o);p.value=String(e[n]),p.disabled=e.autoPilot,g(`${o}-value`).value=T(n,c)}},syncCoordinates(){h();for(const[o,n]of M){const c=g(o);document.activeElement!==c&&(c.value=e[n].toFixed(4))}}}}const re={"whirlpool-speed":"Advances the phase of a bounded swirl pulse. Each pulse bends the petals, eases back to their original coordinate map, then alternates direction. At ±0.060 rad/s, each wind-and-return takes about 17 seconds. Negative rate reverses which way the first pulse turns. Zero or Pause camera holds the pulse. Auto pilot varies the rate smoothly; stopping restores your manual rate.","whirlpool-position":"Pulse phase p, not accumulated twist. The actual twist is W = 0.85 × sin³(3p), so it always stays between −0.85 and +0.85 radians. At p = 0 and every π/3 after that, the original petal map returns with zero swirl velocity. Scrubbing cannot wind the image into tighter and tighter circles.","zoom-speed":"Adds speed × elapsed seconds to log zoom. The pattern samples ln(radius) − zoom, so before lens distortion its scale grows by e^(speed × seconds). Constant speed gives multiplicative magnification.","evolution-speed":"Advances shape time: Δt = Evolution × elapsed seconds. This t shifts sine/cosine phases controlling arch depth, petal blending, and branching. Doubling Evolution runs those changes twice as fast and also doubles ring travel speed.","rotation-speed":"Adds speed × elapsed seconds to the rotation angle, in radians. The pattern samples angle − rotation. A speed of 0.01 rotates about 0.57° per second; changing the sign reverses it.","ring-size":"Sets band width w = size × the viewport’s shorter side. Wider rings affect a wider area and bend it farther. The same band brightens the existing ornament, strongest at its centerline and smoothly fading at both edges. Peak brightness stays the same when width changes.","ring-frequency":"Multiplies the ring’s radial speed. With Evolution and velocity fixed, 2× doubles travel speed and halves the repeat interval. Band thickness stays the same.","ring-velocity":"Multiplies ring travel by a signed value v. +1 and −1 have equal speed in opposite directions; 0 stops radial travel. At ±0.5 a pass takes twice as long. Changing v preserves the current ring position.",symmetry:"Divides the circle into N wedges of angle 2π/N, then mirrors each wedge about its center. N = 8 gives eight repeated 45° sections. Increasing N narrows each repeated section.","fractal-mode":"Chooses the segment replacement rule: Lévy C uses 2 angled segments, Koch uses 4 with a triangular tooth, Quadratic Koch uses 5 with a square step, and Minkowski uses 8 with opposing square turns. The same depth can have very different complexity in each mode.","curve-parameter":"Changes the replacement geometry at every depth: a bend angle for Lévy C, a tooth angle for Koch, or step height for the square-based curves. Each mode remembers its own value. Auto pilot varies it smoothly with Evolution and restores your manual value when stopped. Depth 1 has no replacements to change.",layers:"Depth 1 keeps the smooth arch guide. Each higher depth replaces every curve segment using the selected Fractal mode: 2, 4, 5, or 8 children per segment. Only the final path is drawn. Fine detail fades below the sampling resolution, so the highest depths may look similar.",repetitions:"Adds smaller copies of the entire motif. Each copy doubles radial frequency and folds angle as v → |2v − 1|. Copy i has weight 0.62^i. This changes the number of motifs; Fractal depth changes the shape of every copy.","edge-weave":"Moves each spoke’s two halves toward neighboring wedge boundaries as radius grows. The sampling angle becomes |v − split(radius)|. At 100%, arms meet across wedge boundaries and curl back into linked arches; 0% restores straight spokes. The center is preserved.",warp:"Multiplies a smooth radial displacement: u becomes u + warp × F(u, angle, time), where u is log radius minus zoom. Doubling warp doubles this added displacement; 0 removes this deformation.",seed:"Hashes the integer into four fixed phase angles between 0 and 2π. Those angles offset the ornament’s sine/cosine terms. Nearby seeds can produce unrelated shapes; the same seed always gives the same four angles.","palette-hold":"Sets H, the seconds spent at a fixed palette before blending. One palette step lasts H + B seconds, where B is Blend duration. Raising H lengthens the pause without slowing the blend itself.","palette-blend":"Sets blend progress p = elapsed blend seconds / duration. Color = (1 − s) × start + s × end, with eased weight s = 6p⁵ − 15p⁴ + 10p³. This starts and ends gently; doubling the duration halves the rate of color change.","zoom-position":"This is z in u = ln(radius) − z. Before lens distortion, adding ln(2) ≈ 0.693 doubles a feature’s radius. Equal increments therefore produce equal magnification ratios rather than equal pixel shifts.","evolution-position":"This is t inside terms such as sin(0.5t + phase). Changing it jumps directly to another deformation state. The base arches and branching evolve, carrying the segment-replacement path with them.","ripple-position":"The ring’s travel phase. Adding 1 shifts its center outward by 19% of the viewport’s shorter side, before wrapping to the start of the next pass. Decreasing it retraces the path inward; negative values are valid.","palette-position":"The integer part chooses a palette, repeating every 10 steps. Fractional progress 0–0.5 holds that palette; 0.5–1 eases toward the next. At .75 the two palettes contribute equally.","rotation-position":"This is φ in the sampled angle θ − φ, measured in radians. Adding π rotates the ornament 180°; adding 2π makes one full turn and returns to the same orientation.",quality:"Multiplies both drawing width and height by s, so pixel count grows approximately as s². Fine at 1.5 draws 2.25× as many pixels as Standard, until the four-million-pixel limit reduces the effective scale.","auto-pilot":"Uses sine/cosine waves to vary speeds, including Swirl rate, curve parameters, Warp, Edge weave, and ring settings within their slider limits. Swirl pulses stay bounded and return to petals before turning the other way. Pause camera holds the pulse and its rate modulation; Pause evolution holds the curve parameters and their phase. Stopping restores all manual settings.","camera-pause":"Stops integrating zoom, rotation, and whirlpool. Their stored values are preserved, so resuming continues from the same scale, angle, and twist.","evolution-pause":"Stops integrating shape time and ring travel. Their stored coordinates are preserved. Camera and palette coordinates can still advance independently.","palette-pause":"Sets palette progress per second to 0, preserving the current palette index and blend weight. Resuming continues from the same mixture of colors.",reset:"Restores the starting settings, positions, and Ember / Cobalt palette. Reduced-motion preferences determine which clocks start paused.",fullscreen:"Enters or exits browser fullscreen. You can also press F outside a control, or Escape to exit.","toggle-panel":"Shows or hides the settings menu. This button stays visible when the menu is hidden. You can also press H outside a control."},ie=800;function se(){const e=document.getElementById("tooltips-enabled");let t=(e==null?void 0:e.checked)??!0,s=null,l=null,a=null,r=null,m=null,y=0,v=0;const T=new AbortController,M=[];function E(){window.clearTimeout(y),y=0,m=null}function S(){s&&(s.tooltip.hidden=!0),s=null}function d(u){S(),s=u,u.tooltip.hidden=!1;const b=u.control.getBoundingClientRect(),f=u.tooltip.getBoundingClientRect(),i=Math.max(8,Math.min(b.left,innerWidth-f.width-8)),w=b.bottom+8,x=w+f.height<=innerHeight-8?w:b.top-f.height-8;u.tooltip.style.left=`${i}px`,u.tooltip.style.top=`${Math.max(8,Math.min(x,innerHeight-f.height-8))}px`}function h(){const u=l??a;if(!t||!u||u===r){E(),S();return}s===u||m===u||(E(),S(),m=u,y=window.setTimeout(()=>{m=null,y=0,t&&u===(l??a)&&u!==r&&d(u)},ie))}function o(u){m===u&&E(),window.clearTimeout(v),v=window.setTimeout(()=>{l===u&&(l=null),h()},150)}function n(u=l??a??s??m){window.clearTimeout(v),E(),r=u,l=null,S()}function c(){t=(e==null?void 0:e.checked)??!0,n(),a=null;for(const{control:u,tooltip:b,label:f,original:i}of M)t?u.setAttribute("aria-describedby",[i,b.id].filter(Boolean).join(" ")):i===null?u.removeAttribute("aria-describedby"):u.setAttribute("aria-describedby",i),f==null||f.classList.toggle("has-help",t)}const p={signal:T.signal};for(const[u,b]of Object.entries(re)){const f=document.getElementById(u);if(!f)continue;const i=document.createElement("div");i.id=`${u}-help`,i.className="parameter-tooltip",i.setAttribute("role","tooltip"),i.textContent=b,i.hidden=!0,document.body.append(i);const w=f.getAttribute("aria-describedby"),x=document.querySelector(`label[for="${u}"]`),P={control:f,tooltip:i,label:x,original:w};M.push(P);for(const A of[f,x,i])A&&(A.addEventListener("pointerenter",()=>{window.clearTimeout(v),l=P,r=null,h()},p),A.addEventListener("pointerleave",()=>o(P),p));f.addEventListener("focus",()=>{window.clearTimeout(v),l=null,a=P,r=null,h()},p),f.addEventListener("blur",()=>{a=null,h()},p),f.addEventListener("input",()=>n(P),p),f.addEventListener("click",()=>n(P),p)}return e==null||e.addEventListener("change",c,p),c(),window.addEventListener("keydown",u=>{u.key==="Escape"&&n()},p),window.addEventListener("scroll",()=>n(),{...p,capture:!0}),window.addEventListener("resize",()=>n(),p),()=>{window.clearTimeout(v),E(),T.abort(),M.forEach(({control:u,tooltip:b,label:f,original:i})=>{b.remove(),f==null||f.classList.remove("has-help"),i===null?u.removeAttribute("aria-describedby"):u.setAttribute("aria-describedby",i)})}}const le=`<header class="math-guide-header">
  <div><span class="eyebrow">Fractal Lab / Field notes</span><h2 id="math-guide-title">The math behind the ornament</h2></div>
  <button type="button" id="math-guide-close" class="math-guide-close" aria-label="Close math guide" autofocus>×</button>
</header>
<div class="math-guide-content">
  <p class="math-guide-lead">A picture made from coordinates, curves, and repeated rules.</p>
  <p>Every pixel asks the same question: “Where am I relative to a curve?” Near a boundary, it gets a bright edge; inside, colored enamel; farther away, the dark ground. The functions describing those boundaries change with time.</p>
  <p class="math-guide-note">Playback is held while this window is open. The diagram sliders below are illustrations; they do not change your artwork. “Try the control” closes this guide and takes you to the actual setting.</p>
  <nav class="math-guide-nav" aria-label="Math guide topics">
    <a href="#math-coordinates">Coordinates</a><a href="#math-symmetry">Symmetry</a><a href="#math-arches">Arches</a><a href="#math-fractal">Fractal depth</a><a href="#math-repetition">Repetition</a><a href="#math-weave">Edge weave</a><a href="#math-motion">Motion &amp; lens</a><a href="#math-color">Color &amp; seed</a>
  </nav>

  <section id="math-coordinates" class="math-guide-section">
    <span class="eyebrow">01 / The canvas becomes a map</span>
    <h3>Distance and angle replace x and y.</h3>
    <p>First, the canvas is centered and scaled equally in both directions, so circles stay circular. A pixel’s position becomes its distance <i>r</i> from the center and its angle <i>θ</i>. Radius 1 means half the viewport’s shorter side.</p>
    <div class="math-formula">r = √(x² + y²) &nbsp; · &nbsp; θ = atan2(y, x)</div>
    <p>The radial coordinate then becomes <strong>logarithmic</strong>: <code>u = ln(r) − z</code>, where <i>z</i> is Log zoom. Equal changes in <i>u</i> represent equal scale ratios. Before the lens and other distortions, adding <code>ln(2) ≈ 0.693</code> to zoom doubles a feature’s radius on screen.</p>
    <p>This explains the original stretched spokes: a shape drawn in a narrow angular region widens as it travels farther from the center. Additional radial sine terms use different frequencies, so the underlying architecture does not repeat at one shared zoom interval.</p>
    <button type="button" class="math-control-link" data-control="zoom-position">Try Log zoom →</button>
  </section>

  <section id="math-symmetry" class="math-guide-section">
    <span class="eyebrow">02 / One wedge, many directions</span>
    <h3>Radial symmetry is a coordinate fold.</h3>
    <p>With <i>N</i> sections, each wedge spans <code>2π/N</code> radians, or <code>360°/N</code>. Every pixel’s angle is wrapped into one wedge, then mirrored about its center. The shader evaluates that shared region rather than drawing separate objects around the circle.</p>
    <figure class="math-figure">
      <svg id="math-symmetry-diagram" viewBox="0 0 240 240" role="img" aria-label="An ornamental motif repeated inside mirrored radial wedges"></svg>
      <figcaption><label for="math-symmetry-demo">Diagram sections <output id="math-symmetry-demo-value">8</output></label><input id="math-symmetry-demo" type="range" min="3" max="16" step="1" value="8" /></figcaption>
    </figure>
    <p>The normalized half-wedge coordinate <i>v</i> runs from 0 at its axis to 1 at its boundary. A change inside that coordinate system appears in every wedge. Rotation changes the angle before folding, so the whole construction turns together.</p>
    <button type="button" class="math-control-link" data-control="symmetry">Try Symmetry →</button>
  </section>

  <section id="math-arches" class="math-guide-section">
    <span class="eyebrow">03 / Where the arches come from</span>
    <h3>A curve is the place where a function reaches zero.</h3>
    <p>An <strong>implicit curve</strong> is a boundary described by <code>F(u, v) = 0</code>. The arch field combines a radial cosine with an angular profile. The angular profile bends its boundary across the wedge, producing the arch rather than a circular band.</p>
    <div class="math-formula">A = |cos(R + dP(v))| + 0.56v<sup>1.6</sup> − c</div>
    <p><i>R</i> is the aperiodic radial phase; <i>d</i> controls arch depth; <i>c</i> controls the threshold. The profile <i>P</i> blends a broad cosine with a double-frequency cosine, plus a smaller seeded ripple. Changing that mixture moves the silhouette between arch-like and petal-like forms.</p>
    <figure class="math-figure math-figure-wide">
      <svg id="math-arch-diagram" viewBox="0 0 320 180" role="img" aria-label="Gold arch and blue branch boundaries changing with the petal mixture"></svg>
      <figcaption><span class="math-legend"><span class="math-key-gold">Arch boundary</span><span class="math-key-blue">Branch boundary</span></span><label for="math-petal-demo">Diagram petal mixture <output id="math-petal-demo-value">35%</output></label><input id="math-petal-demo" type="range" min="0" max="1" step="0.01" value="0.35" /><span>This is a simplified, unwrapped half-wedge: left to right is angle; height is radial phase.</span></figcaption>
    </figure>
    <p>A second field describes branching, with a different radial frequency and angular offset. A <strong>smooth minimum</strong> rounds the union between the two fields. That is the “two curves stitched together” effect: their boundaries flow into each other.</p>
    <details class="math-details"><summary>What exactly evolves?</summary><p>Shape time <i>t</i> enters phases such as <code>cycle = 0.50t + seed phase + 0.10u</code>. Sine functions of that phase control petal mixture, branching mixture, and arch depth. Arch depth ranges from 0.30 to 0.94; the threshold ranges from 0.62 to 0.82. Evolution changes the speed at which <i>t</i> advances. Warp adds a separate smooth displacement to the log-radius coordinate before the curves are evaluated.</p></details>
    <button type="button" class="math-control-link" data-control="evolution-speed">Try Evolution →</button>
  </section>

  <section id="math-fractal" class="math-guide-section">
    <span class="eyebrow">04 / Replace the segment</span>
    <h3>Fractal depth changes the contour itself.</h3>
    <p>Start with a segment from <i>A</i> to <i>B</i>. Fractal mode chooses a small replacement path. Apply that same path to <strong>every new segment, in its own direction and scale</strong>. Depth 1 is the starting line; each higher depth applies one more replacement.</p>
    <p><strong>Lévy C</strong> makes two angled segments; <strong>Koch</strong> makes four with a triangular tooth; <strong>Quadratic Koch</strong> makes five with a square step; <strong>Minkowski sausage</strong> makes eight with opposing square turns.</p>
    <div class="math-formula">segments = children per replacement<sup>depth − 1</sup></div>
    <figure class="math-figure math-figure-wide">
      <svg id="math-fractal-diagram" viewBox="0 0 440 210" role="img" aria-label="The actual replacement curve for the selected mode and depth"></svg>
      <figcaption><label for="math-fractal-mode">Diagram fractal mode</label><select id="math-fractal-mode" aria-describedby="math-fractal-mode-note"></select><span id="math-fractal-mode-note"></span><label for="math-curve-parameter"><span id="math-curve-parameter-label">Bend angle</span><output id="math-curve-parameter-value"></output></label><input id="math-curve-parameter" type="range" step="any" value="45" /><label for="math-fractal-demo">Diagram depth <output id="math-fractal-demo-value">2 · 2 segments</output></label><input id="math-fractal-demo" type="range" min="1" max="4" step="1" value="2" /><span>These points come from the same curve generator used by the artwork. The diagram fits each path to its frame.</span></figcaption>
    </figure>
    <p>For standard Lévy C, each child turns 45° from its parent and has length <code>parent length / √2</code>. At the maximum depth of 4, Lévy C has 8 segments, Koch 64, Quadratic Koch 125, and Minkowski 512. These are finite approximations; the 256 × 256 contour texture and screen resolution limit the detail you can see. Fine details fade once they are too small to resolve.</p>
    <p><strong>Curve parameters change the replacement rule at every level.</strong> Lévy C has a bend angle from 15° to 50° (standard: 45°). Koch has a tooth angle from 20° to 84° (standard: 60°); its four child lengths adjust together so the endpoints stay fixed. Quadratic Koch and Minkowski keep right-angle turns and vary their step height as a fraction of the parent segment. Their standard heights are 33⅓% and 25%; other values produce rectangular variants.</p>
    <p>The diagram draws the exact finite path. For smooth motion, the artwork blends signed-distance fields from nearby parameter samples; it is an approximation between those samples. Each standard parameter is included exactly. Preparing a newly selected mode or depth holds playback briefly, while the controls remain usable. Depth 1 is the shared guide, so curve parameters have no visible effect there.</p>
    <p>Auto pilot varies all four stored parameters smoothly, starting at your manual values. Pause evolution freezes this motion, including its phase. Stopping Auto pilot restores all four manual values. Mode, depth, and repetitions stay under your control.</p>
    <p>The diagram shows the curve in its own flat coordinates. In the artwork, it is wrapped around an evolving arch: one local coordinate follows the angle, and the other measures radial phase from the original arch boundary. That is why depth 1 already looks curved on screen. Higher depths replace the local contour, while the larger arch guide still provides its placement. Only the final depth is drawn for each motif.</p>
    <button type="button" class="math-control-link" data-control="layers">Try Fractal depth →</button>
    <button type="button" class="math-control-link" data-control="fractal-mode">Try Fractal mode →</button>
    <button type="button" class="math-control-link" data-control="curve-parameter">Try Curve parameter →</button>
  </section>

  <section id="math-repetition" class="math-guide-section">
    <span class="eyebrow">05 / Copy the whole motif</span>
    <h3>Repetition adds shapes; depth refines each one.</h3>
    <p>Motif repetitions evaluates smaller copies in transformed coordinates. The angular rule <code>v′ = |2v − 1|</code> folds each half of a region onto a complete mirrored child. Doubling the radial phase introduces finer features along log radius. An offset follows the parent arch’s profile, tying the copies to the larger curves.</p>
    <div class="math-formula">q′ = (2q.x + arch offset, |2q.y − 1|)</div>
    <p>Copy <i>i</i> has brightness weight <code>0.62<sup>i</sup></code>, so fine copies are softer. Unlike Fractal depth, repetition <strong>keeps the earlier copies</strong> in the picture. The two controls are independent: one complex motif and several simple motifs can look very different.</p>
    <button type="button" class="math-control-link" data-control="repetitions">Try Motif repetitions →</button>
  </section>

  <section id="math-weave" class="math-guide-section">
    <span class="eyebrow">06 / Let neighboring wedges meet</span>
    <h3>Edge weave bends the coordinate map.</h3>
    <p>The original spoke axis is at <code>v = 0</code>. Edge weave changes sampling to <code>v′ = |v − s(r)|</code>. As the radius grows, <i>s</i> moves from 0 toward 1: the spoke forks into two arms, and each arm leans toward a neighboring wedge. At full strength, they meet at the shared boundaries, then curl back farther out.</p>
    <div class="math-weave-figures">
      <figure class="math-figure"><svg id="math-weave-before" viewBox="0 0 240 240" role="img" aria-label="Straight radial spoke paths with Edge weave disabled"></svg><figcaption>0% · straight paths</figcaption></figure>
      <figure class="math-figure"><svg id="math-weave-after" viewBox="0 0 240 240" role="img" aria-label="Spokes forking and joining their neighbors with full Edge weave"></svg><figcaption>100% · neighboring paths meet</figcaption></figure>
    </div>
    <p>The center is preserved. The remapping is applied after folding, so it retains the selected symmetry. At a fixed strength, the arches travel through a fixed woven coordinate map. Auto pilot slowly sweeps that strength between 0% and 100% over roughly 45 seconds; Pause evolution holds it, and stopping Auto pilot restores your manual strength.</p>
    <button type="button" class="math-control-link" data-control="edge-weave">Try Edge weave →</button>
  </section>

  <section id="math-motion" class="math-guide-section">
    <span class="eyebrow">07 / Position, speed, and refraction</span>
    <h3>Speeds advance coordinates.</h3>
    <p>Each frame adds <code>speed × elapsed seconds</code> to a position. Zoom advances <i>z</i>, rotation advances its angle, Swirl rate advances pulse phase <i>p</i>, and Evolution advances shape time <i>t</i>. Editing a rate changes future movement; editing a coordinate jumps directly to another state. Camera and evolution have independent pause controls.</p>
    <p><strong>Swirl</strong> is a temporary pulse: its twist is <code>W = 0.85 × sin³(3p)</code>. It bends the petals and eases back to the original coordinate map every <code>π/3</code> of phase, then alternates direction. The cubic sine has zero velocity and acceleration at neutral, leaving a gentle interval around the petal view. Twist never exceeds ±0.85 radians, regardless of how long the app runs. At the default rate, each wind-and-return takes about 17 seconds. Negative rate reverses the first pulse.</p>
    <p>Before mirroring, the sampled angle becomes <code>θ − rotation + W × (0.20 + 0.80r²/(1 + r²))</code>, where radius 1 is half the viewport's shorter side. The center receives 20% of the twist, radius 1 receives 60%, and farther edges approach 100%. Rotation still adds its uniform motion. Rotational symmetry remains intact. Returning W to 0 removes only the swirl; independent zoom, evolution, and colors can continue.</p>
    <p>Pause camera or zero Swirl rate holds the pulse. Setting Swirl phase to 0 removes it immediately. Auto pilot varies the magnitude of the rate smoothly toward 0.075 rad/s and back over about 52 seconds, starting at your manual rate. It keeps phase progressing so each pulse completes its return. The pulse and its rate modulation freeze with the camera. Stopping Auto pilot restores your manual rate without jumping the pulse.</p>
    <button type="button" class="math-control-link" data-control="whirlpool-speed">Try Swirl rate →</button>
    <p>The moving lens has a center radius <i>R</i> and band width <i>w</i>. Across the band, define <code>x = (r − R)/(w/2)</code>. Its radial sampling offset uses an odd profile:</p>
    <div class="math-formula">offset = 0.60w × x(1 − x²)³ &nbsp; for −1 ≤ x ≤ 1</div>
    <p>The sign reverses between the inner and outer halves. Displacement and slope reach zero at the band’s edges, so the lens joins the surrounding image smoothly. It bends where the ornament is sampled; it does not draw a colored ring.</p>
    <p>The same band also gathers light. It multiplies the ornament’s brightness by <code>1 + 0.65(1 − x²)³</code> inside the ring: strongest at its centerline and smoothly fading to the original brightness at both edges. This boosts the existing palette before tone mapping, preserving colored detail rather than adding a white outline. Brightness and refraction fade in together at launch and follow the same travel, width, and pauses.</p>
    <p><strong>Ring size</strong> sets the band’s width and scales the displacement. <strong>Ring frequency</strong> multiplies travel and repeat rate. <strong>Ring velocity</strong> supplies the sign: +1 outward, −1 inward, and 0 stationary. Ripple time advances at <code>Evolution × frequency × velocity</code>. Palette timing is independent of all three.</p>
    <button type="button" class="math-control-link" data-control="ring-velocity">Try Ring velocity →</button>
  </section>

  <section id="math-color" class="math-guide-section">
    <span class="eyebrow">08 / Why the same form has many looks</span>
    <h3>Seed, palette, and detail have different jobs.</h3>
    <p>The <strong>seed</strong> produces four fixed phase angles between 0 and 2π. They offset the sine and cosine functions, choosing another family of forms. Nearby seed numbers need not look alike. The same seed, exact coordinates, structure settings, and viewport reproduce the same frame on the same browser and GPU.</p>
    <p>Each palette supplies five roles: ground, primary enamel, secondary enamel, highlights, and accents. After a hold, the colors mix as <code>C = (1 − s)A + sB</code>. For normalized blend time <i>p</i>, the weight <code>s = 6p⁵ − 15p⁴ + 10p³</code> begins and ends gently. Changing colors does not change geometry.</p>
    <p><strong>Render scale</strong> changes the sampling grid. Scaling width and height by 1.5 uses about 2.25 times as many pixels, before the resolution cap. Fine details fade when they are smaller than a pixel; this avoids flicker and means high depth can look similar when zoomed out.</p>
    <button type="button" class="math-control-link" data-control="seed">Try World seed →</button>
  </section>

  <section class="math-guide-section math-guide-experiment">
    <span class="eyebrow">A short experiment</span>
    <h3>Change one rule at a time.</h3>
    <p>Stop Auto pilot and pause the camera, evolution, and colors. Set Motif repetitions to 1 and Edge weave to 0%. Compare Fractal depth 1 → 2 → 3 → 4, then compare the modes at depth 3. Keep depth fixed and increase repetitions. Finally, compare Edge weave at 0% and 100%. This separates contour replacement, added copies, and coordinate bending.</p>
    <p>When you resume Evolution, watch the same rules act on an arch guide whose proportions are changing. Auto pilot varies speeds, curve parameters, Warp, Edge weave, and ring settings with sine waves. Fractal mode, depth, motif repetitions, and symmetry stay yours to explore.</p>
    <button type="button" class="math-control-link" data-control="layers">Return to the controls →</button>
  </section>
</div>
`;function de(){const e=document.getElementById("math-help");if(!e)throw new Error("Missing math guide button.");const t=document.createElement("dialog");t.id="math-guide",t.className="math-guide",t.setAttribute("aria-labelledby","math-guide-title"),t.innerHTML=le,document.body.append(t);const s=new AbortController,l={signal:s.signal};function a(d){const h=t.querySelector(`#${d}`);if(!h)throw new Error(`Missing math guide element: ${d}`);return h}const r=d=>a(d).valueAsNumber,m=a("math-fractal-mode");m.innerHTML=R.map(d=>`<option value="${d.id}">${d.label}</option>`).join(""),m.value="levy-c";const y=a("math-curve-parameter");function v(){const{parameter:d}=R.find(h=>h.id===m.value);y.min=String(d.min),y.max=String(d.max),y.value=String(d.default),a("math-curve-parameter-label").textContent=d.label}v();function T(){const d=r("math-symmetry-demo");a("math-symmetry-demo-value").textContent=String(d);const h=Math.PI*2/d,o=Math.sin(h*.45)*65,n=Math.sin(h*.35)*90;let c='<circle cx="120" cy="120" r="108" fill="none" stroke="var(--math-grid)" />';for(let p=0;p<d;p++){const u=(p+.5)*h;c+=`<path d="M120 120 L${120+Math.sin(u)*108} ${120-Math.cos(u)*108}" class="math-diagram-grid" />`,c+=`<path d="M0 -25 C${-o} -50 ${-n} -93 0 -104 C${n} -93 ${o} -50 0 -25" transform="translate(120 120) rotate(${p*360/d})" class="math-diagram-curve" opacity="${p===0?1:.45}" />`}a("math-symmetry-diagram").innerHTML=c}function M(){const d=r("math-petal-demo");a("math-petal-demo-value").textContent=`${Math.round(d*100)}%`;const h=[],o=[];for(let n=0;n<=120;n++){const c=n/120,p=(1-d)*Math.cos(c*Math.PI)+d*Math.cos(c*Math.PI*2),u=Math.acos(.72-.56*c**1.6)-.75*p,b=(Math.acos(.62-.3*c**1.3)+.75*(p+.34*Math.sin(c*Math.PI*3)))/.54,f=28+c*264;h.push(`${f},${154-u*32}`),o.push(`${f},${154-b*32}`)}a("math-arch-diagram").innerHTML=`<path d="M28 18V155H297" class="math-diagram-grid" /><polyline points="${o.join(" ")}" class="math-diagram-curve math-diagram-blue" /><polyline points="${h.join(" ")}" class="math-diagram-curve" /><text x="28" y="173" class="math-diagram-text">v = 0</text><text x="263" y="173" class="math-diagram-text">v = 1</text>`}function E(){const d=r("math-fractal-demo"),h=R.find(P=>P.id===m.value),o=y.valueAsNumber,n=K(d,h.id,o);let c=0,p=1,u=0,b=0;for(const[P,A]of n)c=Math.min(c,P),p=Math.max(p,P),u=Math.min(u,A),b=Math.max(b,A);const f=Math.min(360/(p-c),140/Math.max(b-u,.25)),i=220-(c+p)*f/2,w=100+(u+b)*f/2,x=n.map(([P,A])=>`${i+P*f},${w-A*f}`).join(" ");a("math-fractal-demo-value").textContent=`${d} · ${(n.length-1).toLocaleString("en-US")} segment${d===1?"":"s"}`,a("math-fractal-mode-note").textContent=h.description,a("math-curve-parameter-value").textContent=h.parameter.unit==="°"?`${o.toFixed(1)}°`:`${(o*100).toFixed(1)}%`,a("math-fractal-diagram").innerHTML=`<path d="M${i} ${w}H${i+f}" class="math-diagram-grid" stroke-dasharray="4 5" /><polyline points="${x}" class="math-diagram-curve" /><circle cx="${i}" cy="${w}" r="3" class="math-diagram-point" /><circle cx="${i+f}" cy="${w}" r="3" class="math-diagram-point" /><text x="${i-4}" y="${w+20}" class="math-diagram-text">A</text><text x="${i+f-4}" y="${w+20}" class="math-diagram-text">B</text>`}function S(d,h){let o="";for(let n=0;n<8;n++)for(const c of[-1,1]){const p=[];for(let u=0;u<=120;u++){const b=u/120*1.45,f=h*(.5-.5*Math.cos(Math.PI*2*Math.max(b-.35,0)/1.3)),i=(n+c*f*.5)*Math.PI/4;p.push(`${120+Math.sin(i)*b*72},${120-Math.cos(i)*b*72}`)}o+=`<polyline points="${p.join(" ")}" class="math-diagram-curve" opacity="0.7" />`}a(d).innerHTML=o}e.addEventListener("click",()=>{t.open||t.showModal()},l),a("math-guide-close").addEventListener("click",()=>t.close(),l),m.addEventListener("change",()=>{v(),E()},l),y.addEventListener("input",E,l);for(const[d,h]of[["math-symmetry-demo",T],["math-petal-demo",M],["math-fractal-demo",E]])a(d).addEventListener("input",h,l);for(const d of t.querySelectorAll("[data-control]"))d.addEventListener("click",()=>{let h=document.getElementById(d.dataset.control??"");h&&"disabled"in h&&h.disabled&&(h=document.getElementById("auto-pilot")),t.close(),h==null||h.scrollIntoView({block:"nearest"}),h==null||h.focus({preventScroll:!0})},l);return t.addEventListener("click",d=>{if(d.target!==t)return;const h=t.getBoundingClientRect();(d.clientX<h.left||d.clientX>h.right||d.clientY<h.top||d.clientY>h.bottom)&&t.close()},l),T(),M(),E(),S("math-weave-before",0),S("math-weave-after",1),{get open(){return t.open},dispose(){s.abort(),t.open&&t.close(),t.remove()}}}async function ce(){const e=document.getElementById("offline-status");if(e){if(!window.isSecureContext){e.textContent="Offline installation needs an HTTPS link.";return}if(!("serviceWorker"in navigator)){e.textContent="This browser cannot save an offline copy.";return}try{await navigator.serviceWorker.register(new URL("sw.js",document.baseURI),{updateViaCache:"none"}),await navigator.serviceWorker.ready,e.textContent="Ready for offline use. Add Fractal Lab to your Home Screen."}catch{e.textContent="Offline copy could not be saved. Reopen online to try again."}}}const U=matchMedia("(prefers-reduced-motion: reduce)").matches,_=H(U);ce();const B=g("art"),W=de();let C=0,z=0,D=0,O=!1;function $(e){O=!0,cancelAnimationFrame(C),g("error").hidden=!1,g("error-message").textContent=e instanceof Error?e.message:String(e),g("status").textContent="Renderer stopped",console.error(e)}try{let e=function(r){try{const m=z?Math.min((r-z)/1e3,.05):0;z=r;let y=!1;if(W.open||(y=!t.prepare(_),y||(Q(_,m),t.draw(_))),r-D>200){s.syncMotionSliders(),s.syncCoordinates();const v=W.open?"MATH GUIDE":y?"PREPARING CURVE":_.cameraPaused&&_.evolutionPaused&&_.palettePaused?"PAUSED":_.autoPilot?"AUTO PILOT":"LIVE";g("status").textContent=`${_.symmetry}-FOLD · ${B.width} × ${B.height} · ${v}`,D=r}C=requestAnimationFrame(e)}catch(m){$(m)}};const t=oe(B),s=ne(_,()=>Object.assign(_,H(U))),l=se(),a=new AbortController;document.addEventListener("visibilitychange",()=>{cancelAnimationFrame(C),z=0,!document.hidden&&!O&&(C=requestAnimationFrame(e))},{signal:a.signal}),B.addEventListener("webglcontextlost",r=>{r.preventDefault(),$(new Error("The graphics context was lost. Reload the page to restart the renderer."))},{signal:a.signal}),C=requestAnimationFrame(e)}catch(e){$(e)}
