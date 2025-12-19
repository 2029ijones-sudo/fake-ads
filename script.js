import { designState, tools } from "./tools.js";

const toolPanel = document.getElementById("toolPanel");
const preview = document.getElementById("adPreview");
const output = document.getElementById("codeOutput");
const generateBtn = document.getElementById("generate");

// Dynamic tool UI generator
tools.forEach(tool => {
  const wrapper = document.createElement("div");
  const label = document.createElement("label");
  label.textContent = tool.label;
  wrapper.appendChild(label);

  let input;
  switch(tool.type){
    case "textInput":
      input = document.createElement("input");
      input.type="text";
      input.value=designState[tool.category][tool.property] || "";
      input.addEventListener("input",()=>{ 
        designState[tool.category][tool.property]=input.value;
        renderPreview();
      });
      break;

    case "slider":
      input = document.createElement("input");
      input.type="range";
      input.min=tool.min; input.max=tool.max;
      input.value=designState[tool.category][tool.property];
      input.addEventListener("input",()=>{
        designState[tool.category][tool.property]=input.value;
        renderPreview();
      });
      break;

    case "colorPicker":
      input = document.createElement("input");
      input.type="color";
      input.value=designState[tool.category][tool.property];
      input.addEventListener("input",()=>{
        designState[tool.category][tool.property]=input.value;
        renderPreview();
      });
      break;

    case "dropdown":
      input = document.createElement("select");
      tool.options.forEach(opt=>{
        const o = document.createElement("option"); o.value=opt; o.textContent=opt; input.appendChild(o);
      });
      input.value=designState[tool.category][tool.property];
      input.addEventListener("change",()=>{
        designState[tool.category][tool.property]=input.value;
        renderPreview();
      });
      break;

    case "imageUpload":
      input = document.createElement("input");
      input.type="file";
      input.accept="image/*";
      input.addEventListener("change",e=>{
        const file = e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload=()=>{ 
          designState[tool.category][tool.property]=reader.result;
          renderPreview();
        };
        reader.readAsDataURL(file);
      });
      break;
  }

  wrapper.appendChild(input);
  toolPanel.appendChild(wrapper);
});

// Live preview function
function renderPreview(){
  const bg = designState.backgroundTools.type==="gradient" ? designState.backgroundTools.gradient :
             designState.backgroundTools.type==="image" ? `url(${designState.backgroundTools.image})` :
             designState.backgroundTools.color;

  preview.innerHTML = `
    <div style="
      display:flex;
      flex-direction:${designState.layoutTools.direction};
      align-items:${designState.layoutTools.alignItems};
      justify-content:${designState.layoutTools.justifyContent};
      gap:${designState.layoutTools.gap}px;
      padding:${designState.layoutTools.padding}px;
      background:${bg};
      border-radius:12px;
      color:${designState.textTools.textColor};
      font-size:${designState.textTools.fontSize}px;
      font-family:${designState.textTools.fontFamily};
      font-weight:${designState.textTools.fontWeight};
      text-shadow:${designState.textTools.textShadow};
      overflow:hidden;
    ">
      ${designState.imageTools.src ? `<img src="${designState.imageTools.src}" style="
        width:${designState.imageTools.width}px;
        height:${designState.imageTools.height}px;
        border-radius:${designState.imageTools.borderRadius}px;
        transform: rotate(${designState.imageTools.rotate}deg);
        filter:${designState.imageTools.filter};
      ">` : ""}
      <div>
        <strong>FAKE AD</strong>
        <p>${designState.textTools.content}</p>
        <button style="
          background:${designState.buttonTools.bgColor};
          color:${designState.buttonTools.textColor};
          border-radius:${designState.buttonTools.borderRadius}px;
          padding:${designState.buttonTools.padding};
        ">${designState.buttonTools.text}</button>
      </div>
    </div>
  `;
}

// Export code
generateBtn.addEventListener("click",()=>{
  const exportCode = `
<!-- FakeAds Embedded Widget -->
<div id="fakeads-root"></div>
<style>
  #fakeads-root *{box-sizing:border-box;}
  #fakeads-root img{max-width:100%; border-radius:${designState.imageTools.borderRadius}px;}
  #fakeads-root button{
    border:none; cursor:pointer; border-radius:${designState.buttonTools.borderRadius}px;
    background:${designState.buttonTools.bgColor}; color:${designState.buttonTools.textColor};
    padding:${designState.buttonTools.padding};
  }
</style>
<script>
(function(){
  const config = ${JSON.stringify(designState)};
  const root = document.getElementById("fakeads-root");
  const bg = config.backgroundTools.type==="gradient"?config.backgroundTools.gradient:
             config.backgroundTools.type==="image"?`url(\${config.backgroundTools.image})`:
             config.backgroundTools.color;
  root.innerHTML = \`
    <div style="
      display:flex; flex-direction:\${config.layoutTools.direction};
      align-items:\${config.layoutTools.alignItems};
      justify-content:\${config.layoutTools.justifyContent};
      gap:\${config.layoutTools.gap}px; padding:\${config.layoutTools.padding}px;
      background:\${bg}; border-radius:12px; color:\${config.textTools.textColor};
      font-size:\${config.textTools.fontSize}px; font-family:\${config.textTools.fontFamily};
      font-weight:\${config.textTools.fontWeight}; text-shadow:\${config.textTools.textShadow};
      overflow:hidden;
    ">
      \${config.imageTools.src?`<img src="\${config.imageTools.src}" style="
        width:\${config.imageTools.width}px; height:\${config.imageTools.height}px;
        border-radius:\${config.imageTools.borderRadius}px;
        transform: rotate(\${config.imageTools.rotate}deg);
        filter:\${config.imageTools.filter};
      ">`:``}
      <div>
        <strong>FAKE AD</strong>
        <p>\${config.textTools.content}</p>
        <button>\${config.buttonTools.text}</button>
      </div>
    </div>
  \`;
})();
</script>
<!-- End FakeAds -->
`.trim();

  output.value = exportCode;
});

// Initial render
renderPreview();
