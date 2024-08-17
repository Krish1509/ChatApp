import  { useState } from 'react';

const solidColors = [
  '#000000','#202124','#000510','#002165','#011529',
'#3D195D','#4A055E','#5106BB','#340946','#0F0C2C',
  '#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF3',
  '#F3FF33', '#FF3333', '#33FF88', '#8833FF', '#FF8833'
];

const images = [
  '/bg.png', '/bg1.png', '/bg2.png', '/bg3.jpeg', '/bg4.jpg',
  '/bg5.jfif', '/bg6.png', '/bg7.jpg', '/bg8.jpg', '/bg9.jpg',
  '/bg11.jpg', '/bg12.avif', '/bg13.jpg', '/bg14.jpg', '/bg15.jpeg',
  '/bg16.avif', '/bg17.jpg', '/bg18.jpg', '/bg19.jpg', '/bg20.jfif'
];

const gifs = [
  '/bg1.gif', '/bg2.gif', '/bg3.gif', '/bg4.gif', '/bg5.gif',
  '/bg6.gif', '/bg7.gif', '/bg8.gif', '/bg9.gif', '/bg10.gif'
];

function BackgroundChanger() {
  const [selectedBg, setSelectedBg] = useState('/bg8.gif');

  const handleBgChange = (bg, isColor = false) => {
    setSelectedBg(bg);
    if (isColor) {
      document.body.style.background = bg;
    } else {
      document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${bg})`;
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Solid Colors */}
      <div className="w-full">
        <h4 className="text-center mb-2 text-sm font-bold text-white">Solid Colors</h4>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {solidColors.map((color, index) => (
            <button
              key={index}
              onClick={() => handleBgChange(color, true)}
              style={{
                backgroundColor: color,
                width: '30px',
                height: '30px',
                border: selectedBg === color ? '2px solid #fff' : 'none',
              }}
            ></button>
          ))}
        </div>
      </div>

      <hr className="w-full border-t border-gray-300" />

      {/* Images */}
      <div className="w-full">
        <h4 className="text-center mb-2 text-sm font-bold text-white">Images</h4>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {images.map((bg, index) => (
            <button
              key={index}
              onClick={() => handleBgChange(bg)}
              style={{
                backgroundImage: `url(${bg})`,
                width: '30px',
                height: '30px',
                backgroundSize: 'cover',
                border: selectedBg === bg ? '2px solid #fff' : 'none',
              }}
            ></button>
          ))}
        </div>
      </div>

      <hr className="w-full border-t border-gray-300" />

      {/* GIFs */}
      <div className="w-full">
        <h4 className="text-center mb-2 text-sm font-bold text-white">GIFs</h4>
        <div className="grid grid-cols-5 gap-2">
          {gifs.map((bg, index) => (
            <button
              key={index}
              onClick={() => handleBgChange(bg)}
              style={{
                backgroundImage: `url(${bg})`,
                width: '30px',
                height: '30px',
                backgroundSize: 'cover',
                border: selectedBg === bg ? '2px solid #fff' : 'none',
              }}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BackgroundChanger;
