import { useEffect, useRef, useState } from 'react';
import menuManage from '../../ultils/menuManage';
import { Link } from 'react-router-dom';
import { AiOutlineLogout, AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import Swal from 'sweetalert2';

type DropdownMenuProps = {
  buttonLabel: string;
};

interface Node extends Element {
  closest(selector: string): Element | null;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  buttonLabel,
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown relative  " ref={dropdownRef}>
      <button
        className="dropdownButton  inline-flex justify-center items-center space-x-2 px-4 bg-gray-300 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        onClick={handleButtonClick}
      >
        <span>{buttonLabel}</span>
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="dropdown-menu absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg z-30">
          {menuManage.map((item) => {
            return (
              <Link
                className=" px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-blue-600 border-b border-gray-200 w-[200px]"
                key={item.id}
                to={item?.path}
              >
                {item?.icon}
                {item.text}
              </Link>
            );
          })}
          <span
            className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-blue-600 border-b border-gray-200 w-[200px] "
            onClick={() => {
              setIsOpen(false);
              dispatch(actions.logout());
              Swal.fire('Warning', 'Bạn sẽ đăng xuất!', 'warning');
            }}
          >
            <AiOutlineLogout />
            Đăng xuất
          </span>
        </div>
      )}
    </div>
  );
};
export default DropdownMenu;
