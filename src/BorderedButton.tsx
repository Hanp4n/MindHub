type BorderedButtonProps = {
  title: string;
  img?: string;
  action: Function;
}

const BorderedButton = ({ title, img, action }: BorderedButtonProps) => {
  return (
    <button onClick={() => action()} className="cursor-pointer flex items-center justify-center gap-4 border rounded-md p-3 py-1 border-[var(--mh-gray)]
    w-fit">
      {img !== undefined ? <div className="w-4">
        <img src={img} />
      </div> : <></>}
      
      <p>{title}</p>
    </button>
  );
}

export default BorderedButton;

