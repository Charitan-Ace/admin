import { DefaultColumnHeaderProps } from "./interfaces";

const DefaultColumnHeader = ({ title }: DefaultColumnHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="font-medium">{title}</span>
    </div>
  );
};

export default DefaultColumnHeader;
