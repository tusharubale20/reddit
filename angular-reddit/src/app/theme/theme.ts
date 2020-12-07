export interface Theme {
    name: string;
    properties: any;
  }
  
  export const light: Theme = {
    name: "light",
    properties: {
        "--background-main": "#DAE0E6",
        "--background-primary": "#FFFFFF",
        "--header-background-color": "#f8f9fa",
        "--header-border-bottom-color": "#FFFFFF",

        "--primary-btn-color": "#FFFFFF",
        "--primary-btn-background-color": "#0079D3",
        "--primary-btn-border-color": "#0079D3",
        "--primary-btn-fill-color": "#FFFFFF",

        "--secondary-btn-color": "#0079D3",
        "--secondary-btn-background-color": "transparent",
        "--secondary-btn-border-color": "#0079D3",
        "--secondary-btn-fill-color": "#0079D3",

        "--text-color": "1A1A1B"

    }
  };
  
  export const dark: Theme = {
    name: "dark",
    properties: {
        "--background-main": "#1A1A1B",
        "--background-primary": "#1A1A1B",
        "--header-background-color": "#1A1A1B",
        "--header-border-bottom-color": "#D3D3D3",
        
        "--primary-btn-color": "#1A1A1B",
        "--primary-btn-background-color": "#ebeced",
        "--primary-btn-border-color": "#ebeced",
        "--primary-btn-fill-color": "#1A1A1B",

        "--secondary-btn-color": "#D7DADC",
        "--secondary-btn-background-color": "transparent",
        "--secondary-btn-border-color": "#D7DADC",
        "--secondary-btn-fill-color": "#D7DADC",

        "--text-color": "#FFFFFF"
    }
  };