import { designState, tools } from "./tools.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const isCreator = urlParams.get("creator") === "true";

  const toolPanel = document.getElementById("toolPanel");
  const preview = document.getElementById("adPreview");
  const output = document.getElementById("codeOutput");
  const generateBtn = document.getElementById("generate");
  const previewSection = document.getElementById("previewSection");

  // Show preview for both creator & visitor
  previewSection.style.display = "block";

  if (isCreator) {
    // Generate tools UI
    tools.forEach(tool => {
      const wrapper = document.createElement("div");
      const label = document.createElement("label");
      label.textContent = tool.label;
      wrapper.appendChild(label);

      let input;
      switch (tool.type) {
        case "textInput":
          input = document.createElement("input");
          input.type = "text";
          input.value = designState[tool.category][tool.property] || "";
          input.addEventListener("input", () => {
            designState[tool.category][tool.property] = input.value;
            renderPreview();
          });
          break;
        case "slider":
          input = document.createElement("input");
          input.type = "range";
          input.min = tool.min;
          input.max = tool.max;
          input.value = designState[tool.category][tool.property] || tool.min;
          input.addEventListener("input", () => {
            designState[tool.category][tool.property] = input.value;
            renderPreview();
          });
          break;
        case "colorPicker":
          input = document.createElement("input");
          input.type = "color";
          input.value = designState[tool.category][tool.property] || "#ffffff";
          input.addEventListener("input", () => {
            designState[tool.category][tool.property] = input.value;
            renderPreview();
          });
          break;
        case "dropdown":
          input = document.createElement("select");
          tool.options.forEach(opt => {
            const o = document.createElement("option");
            o.value = opt;
            o.textContent = opt;
            input.appendChild(o);
          });
          input.value = designState[tool.category][tool.property] || tool.options[0];
          input.addEventListener("change", () => {
            designState[tool.category][tool.property] = input.value;
            renderPreview();
          });
          break;
        case "imageUpload":
          input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.addEventListener("change", e => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              designState[tool.category][tool.property] = reader.result;
              renderPreview();
            };
            reader.readAsDataURL(file);
          });
          break;
      }

      wrapper.appendChild(input);
      toolPanel.appendChild(wrapper);
    });
  } else {
    // Visitor mode: hide tools panel
    if (toolPanel) toolPanel.style.display = "none";
  }

  generateBtn.addEventListener("click", () => {
    const exportCode = generateEmbedCode(designState);
    output.value = exportCode;
  });

  renderPreview();

  function renderPreview() {
    const bg = designState.backgroundTools.type === "gradient"
      ? designState.backgroundTools.gradient
      : designState.backgroundTools.type === "image"
      ? `url(${designState.backgroundTools.image})`
      : designState.backgroundTools.color || "#4f46e5";

    preview.innerHTML = `
      <div style="
        display:flex;
        flex-direction:${designState.layoutTools.direction || "vertical"};
        align-items:${designState.layoutTools.alignItems || "center"};
        justify-content:${designState.layoutTools.justifyContent || "center"};
        gap:${designState.layoutTools.gap || 12}px;
        padding:${designState.layoutTools.padding || 16}px;
        background:${bg};
        border-radius:12px;
        color:${designState.textTools.textColor || "#fff"};
        font-size:${designState.textTools.fontSize || 16}px;
        font-family:${designState.textTools.fontFamily || "Arial, sans-serif"};
        font-weight:${designState.textTools.fontWeight || "normal"};
        text-shadow:${designState.textTools.textShadow || "none"};
        overflow:hidden;
      ">
        ${designState.imageTools.src ? `<img src="${designState.imageTools.src}" style="
          width:${designState.imageTools.width || 120}px;
          height:${designState.imageTools.height || 120}px;
          border-radius:${designState.imageTools.borderRadius || 8}px;
          transform: rotate(${designState.imageTools.rotate || 0}deg);
          filter:${designState.imageTools.filter || "none"};
        ">` : ""}
        <div>
          <strong>FAKE AD</strong>
          <p>${designState.textTools.content || "Your fake ad text"}</p>
          <button style="
            background:${designState.buttonTools.bgColor || "#020617"};
            color:${designState.buttonTools.textColor || "#fff"};
            border-radius:${designState.buttonTools.borderRadius || 6}px;
            padding:${designState.buttonTools.padding || "10px 16px"};
          ">${designState.buttonTools.text || "Click Me"}</button>
        </div>
      </div>
    `;
  }

  function generateEmbedCode(config) {
    return `
<!-- FakeAds Embedded Widget -->
<div id="fakeads-root"></div>
<style>
  #fakeads-root * { box-sizing: border-box; }
  #fakeads-root img { max-width: 100%; border-radius: ${config.imageTools.borderRadius || 8}px; }
  #fakeads-root button {
    border: none; cursor: pointer; border-radius: ${config.buttonTools.borderRadius || 6}px;
    background: ${config.buttonTools.bgColor || "#020617"};
    color: ${config.buttonTools.textColor || "#fff"};
    padding: ${config.buttonTools.padding || "10px 16px"};
  }
</style>
<script>
(function(){
  const cfg = ${JSON.stringify(config)};
  const root = document.getElementById("fakeads-root");
  const bg = cfg.backgroundTools.type === "gradient" ? cfg.backgroundTools.gradient :
             cfg.backgroundTools.type === "image" ? \`url(\${cfg.backgroundTools.image})\` :
             cfg.backgroundTools.color;
  root.innerHTML = \`
    <div style="
      display:flex; flex-direction:\${cfg.layoutTools.direction};
      align-items:\${cfg.layoutTools.alignItems};
      justify-content:\${cfg.layoutTools.justifyContent};
      gap:\${cfg.layoutTools.gap}px; padding:\${cfg.layoutTools.padding}px;
      background:\${bg}; border-radius:12px; color:\${cfg.textTools.textColor};
      font-size:\${cfg.textTools.fontSize}px; font-family:\${cfg.textTools.fontFamily};
      font-weight:\${cfg.textTools.fontWeight}; text-shadow:\${cfg.textTools.textShadow};
      overflow:hidden;
    ">
      \${cfg.imageTools.src?`<img src="\${cfg.imageTools.src}" style="
        width:\${cfg.imageTools.width}px; height:\${cfg.imageTools.height}px;
        border-radius:\${cfg.imageTools.borderRadius}px;
        transform: rotate(\${cfg.imageTools.rotate}deg);
        filter:\${cfg.imageTools.filter};
      ">`:``}
      <div>
        <strong>FAKE AD</strong>
        <p>\${cfg.textTools.content}</p>
        <button>\${cfg.buttonTools.text}</button>
      </div>
    </div>
  \`;
})();
</script>
<!-- End FakeAds -->
    `.trim();
  }
});
