import React from 'react';

const Carousel = () => {
    return (
        <div className=' '>
<div className="carousel mt-10 mx-80 w-[600px] h-[400px]">
  <div id="item4" className="carousel-item w-full ">
    <img
      src="https://3.imimg.com/data3/HL/MM/MY-10413033/single-bed-room-services.jpg"
      className="w-full" />
  </div>
  <div id="item2" className="carousel-item w-full">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDJDJguMrbojupCEi7-Vf_DX-EfYy8PZ35vg&s"
      className="w-full" />
  </div>
  <div id="item3" className="carousel-item w-full">
    <img
      src="https://www.photocase.com/photos/4409003-single-bed-in-minimalist-style-bedroom-interior-photocase-stock-photo-large.jpeg"
      className="w-full" />
  </div>
  <div id="item1" className="carousel-item w-full">
    <img
      src="https://hotel79.ru/assets/images/room_gallery/2m/2m_new12.jpg"
      className="w-full" />
  </div>
</div>
<div className="flex w-full justify-center gap-2 py-2">
  <a href="#item1" className="btn btn-xs">1</a>
  <a href="#item2" className="btn btn-xs">2</a>
  <a href="#item3" className="btn btn-xs">3</a>
  <a href="#item4" className="btn btn-xs">4</a>
</div>            
        </div>
    );
};

export default Carousel;