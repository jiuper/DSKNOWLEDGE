interface IPicture {
  src: string;
  alt?: string;
  classPrefix?: string;
  title?:string;
  handleAction?:()=>void;
}

export const Picture = ({ src, alt, classPrefix, title, handleAction }: IPicture) => {
  return (
    <img 
      className={classPrefix}
      src={src} 
      alt={alt}  
      onClick={handleAction} 
      title={title}
    />
  )
}
