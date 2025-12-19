import { designState } from "./tools.js";

const preview = document.getElementById("adPreview");
const output = document.getElementById("codeOutput");

function renderPreview() {
  const bg =
    designState.bgType === "gradient"
      ? designState.bgGradient
      : designState.bgColor;

  preview.innerHTML = `
    <div class="fakead" style="
      background:${bg};
      color:${designState.textColor};
      font-size:${designState.fontSize}px;
      flex-direction:${designState.layout === "horizontal" ? "row" : "column"};
    ">
      ${designState.image ? `<img src="${designState.image}" />` : ""}
      <div class="content">
        <strong>FAKE AD</strong>
        <p>${designState.text}</p>
        <button>${designState.buttonText}</button>
      </div>
    </div>
  `;
}

document.getElementById("generate").addEventListener("click", () => {
  const exportCode = `
<!-- FakeAds Embedded Widget -->
<div id="fakeads-root"></div>

<style>
#fakeads-root .fakead{
  display:flex;
  gap:12px;
  padding:16px;
  border-radius:12px;
  align-items:center;
  max-width:100%;
}
#fakeads-root img{
  max-width:120px;
  border-radius:8px;
}
#fakeads-root button{
  padding:10px 16px;
  border:none;
  border-radius:6px;
  cursor:pointer;
  background:#020617;
  color:white;
}
</style>

<script>
(function(){
  const config = ${JSON.stringify(designState)};

  const root = document.getElementById("fakeads-root");

  const bg = config.bgType === "gradient"
    ? config.bgGradient
    : config.bgColor;

  root.innerHTML = \`
    <div class="fakead" style="
      background:\${bg};
      color:\${config.textColor};
      font-size:\${config.fontSize}px;
      flex-direction:\${config.layout === "horizontal" ? "row" : "column"};
    ">
      \${config.image ? '<img src="' + config.image + '">' : ''}
      <div>
        <strong>FAKE AD</strong>
        <p>\${config.text}</p>
        <button>\${config.buttonText}</button>
      </div>
    </div>
  \`;
})();
</script>
<!-- End FakeAds -->
`.trim();

  output.value = exportCode;
});

renderPreview();
