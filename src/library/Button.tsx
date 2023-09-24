import { useRouter } from "next/router";

type props = {
  children: any;
  isSecondary?: boolean;
  isOutlined?: boolean;
  isIcon?: boolean;
  href?: string;
  type?: "button" | "submit";
  isLarge?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  isExternalLink?: boolean;
};

const LibButton: React.FC<props> = ({
  children,
  isSecondary = false,
  isOutlined = false,
  isIcon = false,
  href,
  type = "button",
  isLarge = false,
  onClick,
  disabled = false,
  isExternalLink = false,
}) => {
  const router = useRouter();

  function clickButton() {
    if (href) {
      if (isExternalLink) {
        window.open(href, "_blank");
      } else {
        router.push(href);
      }
    } else if (onClick) {
      onClick();
    }
  }

  let border = {
    color: "border-primary",
    hover: "hover:border-primary-dark",
    disabled: "disabled:border-primary-light",
  };
  let background = {
    color: "bg-primary",
    hover: "hover:bg-primary-dark",
    disabled: "disabled:bg-primary-light",
  };
  let text = {
    color: "text-primary",
    hover: "hover:text-primary-dark",
    disabled: "disabled:text-primary-light",
  };

  if (isSecondary) {
    border = {
      color: "border-secondary",
      hover: "hover:border-secondary-dark",
      disabled: "disabled:border-secondary-light",
    };
    background = {
      color: "bg-secondary",
      hover: "hover:bg-secondary-dark",
      disabled: "disabled:bg-secondary-light",
    };
    text = {
      color: "text-secondary",
      hover: "hover:bg-secondary-dark",
      disabled: "disabled:text-secondary-light",
    };
  }

  let classes = `block border ${border.color} ${border.hover} ${border.disabled} font-bold uppercase tracking-wide disabled:cursor-not-allowed`;

  if (isIcon) {
    classes += ` bg-transparent border-none ${text.color} ${text.hover} ${text.disabled}`;
  } else if (isOutlined) {
    classes += ` bg-transparent rounded-md ${background.hover} ${text.color} hover:text-white ${text.disabled}`;
  } else {
    classes += ` rounded-md ${background.color} ${background.hover} ${background.disabled} text-white`;
  }

  if (isIcon) {
    classes += ` py-1.5 px-2`;
  } else if (isLarge) {
    classes += " py-2 px-6 text-2xl";
  } else {
    classes += " py-1 px-4";
  }

  return (
    <button
      className={classes}
      type={type}
      onClick={clickButton}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default LibButton;
