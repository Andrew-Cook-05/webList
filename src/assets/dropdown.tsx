import { useState, useRef, useEffect } from "react";

type DropdownProps = {
    trigger: React.ReactNode,
    children: React.ReactNode
};

export default function Dropdown({trigger, children}: DropdownProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => {document.removeEventListener("mousedown", handleClick);};
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div onClick={() => setOpen(prev => !prev)}>
                {trigger}
            </div>
            {open && (
                <div className="dropdown-menu">
                    {children}
                </div>
            )}
        </div>
    );
}