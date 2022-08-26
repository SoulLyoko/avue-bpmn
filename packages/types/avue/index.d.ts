declare module "@smallwei/avue" {
  const AvueConfig: {
    size?: "large" | "default" | "small";
    menuType?: "button" | "icon" | "text" | "menu";
    theme?: "dark";
    axios: import("axios").AxiosInstance;
  };
  const Avue: {
    install(app: import("vue").App, config?: AvueConfig): void;
  };
  export default Avue;
}
