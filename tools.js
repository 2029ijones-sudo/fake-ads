// designState stores current design values
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
    image: null,
    overlay: "none"
  },
  layoutTools: {
    direction: "vertical",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "16px",
    margin: "0"
  },
  imageTools: {
    src: null,
    width: 120,
    height: 120,
    borderRadius: 8,
    filter: "none",
    rotate: 0
  },
  shapeTools: [], // {type,color,size,x,y,rotation}
  animationTools: {
    entry: "none",
    hover: "none"
  }
};

// Tools definitions: dynamically generate UI controls
export const tools = [
  // TEXT
  { category: "textTools", property: "content", type: "textInput", label: "Ad Text" },
  { category: "textTools", property: "fontSize", type: "slider", min: 8, max: 72, label: "Font Size" },
  { category: "textTools", property: "fontWeight", type: "dropdown", options: ["normal","bold","bolder"], label: "Font Weight" },
  { category: "textTools", property: "textColor", type: "colorPicker", label: "Text Color" },

  // BUTTON
  { category: "buttonTools", property: "text", type: "textInput", label: "Button Text" },
  { category: "buttonTools", property: "bgColor", type: "colorPicker", label: "Button Background" },
  { category: "buttonTools", property: "textColor", type: "colorPicker", label: "Button Text Color" },
  { category: "buttonTools", property: "borderRadius", type: "slider", min:0,max:50,label:"Button Border Radius" },

  // BACKGROUND
  { category: "backgroundTools", property: "type", type: "dropdown", options: ["solid","gradient","image"], label:"Background Type" },
  { category: "backgroundTools", property: "color", type: "colorPicker", label:"Background Color" },
  { category: "backgroundTools", property: "gradient", type: "gradientPicker", label:"Background Gradient" },
  { category: "backgroundTools", property: "image", type: "imageUpload", label:"Background Image" },

  // IMAGE
  { category: "imageTools", property: "src", type: "imageUpload", label:"Image" },
  { category: "imageTools", property: "width", type: "slider", min:20,max:500,label:"Image Width" },
  { category: "imageTools", property: "height", type: "slider", min:20,max:500,label:"Image Height" },
  { category: "imageTools", property: "borderRadius", type: "slider", min:0,max:50,label:"Image Border Radius" },
  { category: "imageTools", property: "rotate", type: "slider", min:0,max:360,label:"Image Rotate" },

  // LAYOUT
  { category: "layoutTools", property: "direction", type: "dropdown", options: ["vertical","horizontal","grid"], label:"Layout Direction" },
  { category: "layoutTools", property: "gap", type: "slider", min:0,max:50,label:"Gap" },
  { category: "layoutTools", property: "padding", type: "slider", min:0,max:100,label:"Padding" },

  // ANIMATION
  { category: "animationTools", property: "entry", type: "dropdown", options:["none","fade","slide","bounce"], label:"Entry Animation" },
  { category: "animationTools", property: "hover", type: "dropdown", options:["none","fade","slide","bounce"], label:"Hover Animation" }
];
