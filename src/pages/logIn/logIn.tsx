import LogInForm from "./logIn-form";

export default function LogIn() {
  type Arrow = {
    src: string;
    Width: string;
    Height: string;
    Top: string;
    Left: string;
    Radius?: string;
    Border?: string;
    Opacity: string;
    BorderColor?: string;
    Zindex?: string
  };

  const Arrows: Arrow[] = [
    { 
      src: '/images/log-In-Images/arrow-one.jpg',
      Width: 'w-[80px]',
      Height: 'h-[141.11px]',
      Top: 'top-[195px]',
      Left: 'left-[1099px]',
      Radius: 'rounded-[4px]',
      Border: 'border',
      Opacity: 'opacity-[80%]',
      BorderColor: 'border-[#FFC107]',
      Zindex : 'z-10'
    },
    { 
      src: '/images/log-In-Images/arrow-two.jpg',
      Width: 'w-[80px]',
      Height: 'h-[145px]',
      Top: 'top-[737px]',
      Left: 'left-[333px]',
      Radius: 'rounded-[4px]',
      Border: 'border',
      Opacity: 'opacity-[80%]',
      BorderColor: 'border-[#FFC107]',
      Zindex : 'z-10'
    },
    { 
      src: '/images/log-In-Images/arrow-three.jpg',
      Width: 'w-[239px]',
      Height: 'h-[140px]',
      Top: 'top-[810px]',
      Left: 'left-[1392px]',
      Border: 'border',
      Opacity: 'opacity-[30%]',
      BorderColor: 'border-[#FFC107]',
    },
    { 
      src: '/images/log-In-Images/arrow-four.jpg',
      Width: 'w-[239px]',
      Height: 'h-[140px]',
      Top: 'top-[40px]',
      Left: 'left-[-120px]',
      Border: 'border',
      Opacity: 'opacity-[30%]',
      BorderColor: 'border-[#FFC107]',
    },
    { 
      src: '/images/log-In-Images/lines-arrow-one.jpg',
      Width: 'w-[80px]',
      Height: 'h-[141.1px]',
      Top: 'top-[195px]',
      Left: 'left-[1106px]',
      Radius: 'rounded-[4px]',
      Border: 'border',
      Opacity: 'opacity-[80%]',
      BorderColor: 'border-[#FFC107]',
    },
    { 
      src: '/images/log-In-Images/lines-arrow-two.jpg',
      Width: 'w-[80px]',
      Height: 'h-[145px]',
      Top: 'top-[737px]',
      Left: 'left-[322px]',
      Radius: 'rounded-[4px]',
      Border: 'border',
      Opacity: 'opacity-[80%]',
      BorderColor: 'border-[#FFC107]',
    },
  ];

  return (
  <section className="relative w-full max-w-[1512px] h-auto min-h-screen m-auto overflow-hidden">
      {Arrows.map((arr, index) => (
        <img
          key={index}
          src={arr.src}
          className={`
            absolute
            ${arr.Width}
            ${arr.Height}
            ${arr.Left}
            ${arr.Top}
            ${arr.Opacity}
            ${arr.Zindex}
            ${arr.Radius ? arr.Radius : ''}
            ${arr.Border ? arr.Border : ''}
            ${arr.BorderColor ? arr.BorderColor : ''}
          `}
        />
      ))}
      <LogInForm />
    </section>
  );
}
