export const designState = {
  textTools: {
    content: "Your fake ad text",
    fontSize: 16,
    fontFamily: "Arial, sans-serif",
    fontWeight: "normal",
    fontStyle: "normal",
    textColor: "#ffffff",
    textShadow: "none",
    gradient: null
  },
  buttonTools: {
    text: "Click Me",
    bgColor: "#020617",
    textColor: "#ffffff",
    borderRadius: 6,
    padding: "10px 16px",
    hoverEffect: "none"
  },
  backgroundTools: {
    type: "solid", // solid | gradient | image
    color: "#4f46e5",
    gradient: "linear-gradient(135deg,#6366f1,#22d3ee)",
    image: null, // base64
    overlay: "none" // optional
  },
  layoutTools: {
    direction: "vertical", // vertical | horizontal | grid
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "16px",
    margin: "0"
  },
  imageTools: {
    src: null, // base64
    width: 120,
    height: 120,
    borderRadius: 8,
    filter: "none",
    rotate: 0
  },
  shapeTools: [], // array of shapes/icons {type,color,size,x,y,rotation}
  animationTools: {
    entry: "none",
    hover: "none"
  }
};

// Mini-tool definitions that map to designState
export const tools = [
  // TEXT TOOLS
  { category: "textTools", property: "fontSize", type: "slider", min: 8, max: 72 },
  { category: "textTools", property: "fontWeight", type: "dropdown", options: ["normal","bold","bolder"] },
  { category: "textTools", property: "textColor", type: "colorPicker" },
  { category: "textTools", property: "gradient", type: "gradientPicker" },
  { category: "textTools", property: "textShadow", type: "dropdown", options: ["none","small","medium","large"] },

  // BUTTON TOOLS
  { category: "buttonTools", property: "borderRadius", type: "slider", min: 0, max: 50 },
  { category: "buttonTools", property: "bgColor", type: "colorPicker" },
  { category: "buttonTools", property: "textColor", type: "colorPicker" },
  { category: "buttonTools", property: "hoverEffect", type: "dropdown", options: ["none","bounce","fade","slide"] },

  // BACKGROUND TOOLS
  { category: "backgroundTools", property: "type", type: "dropdown", options: ["solid","gradient","image"] },
  { category: "backgroundTools", property: "color", type: "colorPicker" },
  { category: "backgroundTools", property: "gradient", type: "gradientPicker" },
  { category: "backgroundTools", property: "image", type: "imageUpload" },

  // LAYOUT TOOLS
  { category: "layoutTools", property: "direction", type: "dropdown", options: ["vertical","horizontal","grid"] },
  { category: "layoutTools", property: "alignItems", type: "dropdown", options: ["start","center","end","stretch"] },
  { category: "layoutTools", property: "justifyContent", type: "dropdown", options: ["start","center","end","space-between","space-around"] },
  { category: "layoutTools", property: "gap", type: "slider", min: 0, max: 50 },
  { category: "layoutTools", property: "padding", type: "slider", min: 0, max: 100 },

  // IMAGE TOOLS
  { category: "imageTools", property: "src", type: "imageUpload" },
  { category: "imageTools", property: "width", type: "slider", min: 20, max: 500 },
  { category: "imageTools", property: "height", type: "slider", min: 20, max: 500 },
  { category: "imageTools", property: "borderRadius", type: "slider", min: 0, max: 50 },
  { category: "imageTools", property: "rotate", type: "slider", min: 0, max: 360 },
  { category: "imageTools", property: "filter", type: "dropdown", options: ["none","grayscale","sepia","blur","contrast"] },

  // SHAPE TOOLS (example)
  { category: "shapeTools", property: "addCircle", type: "shapeAdder", shapeType: "circle" },
  { category: "shapeTools", property: "addRectangle", type: "shapeAdder", shapeType: "rectangle" },

  // ANIMATION TOOLS
  { category: "animationTools", property: "entry", type: "dropdown", options: ["none","fade","slide","bounce"] },
  { category: "animationTools", property: "hover", type: "dropdown", options: ["none","fade","slide","bounce"] }
];
