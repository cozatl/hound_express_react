
// 1. Import all images eagerly (nos used)
const context = (require as any).context(
  '../../assets/img', 
  true, 
  /\.(png|jpe?g|svg)$/
);

const images: Record<string, string> = {};

context.keys().forEach((path: string) => {
  // path será algo como: "./logo.png" o "./subcarpeta/avatar.jpg"
  
  // Extrae solo el nombre del archivo (ej. "logo.png")
  const fileName = path.split('/').pop() || '';
  
  // Obtiene la URL procesada del asset
  // Nota: En CRA/Webpack a veces necesitas .default dependiendo de la configuración,
  // pero generalmente context(path) ya te devuelve la cadena de la URL directamente.
  const module = context(path);
  images[fileName] = module.default || module;
});

export { images };