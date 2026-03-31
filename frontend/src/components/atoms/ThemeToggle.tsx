import {useTheme} from "../../context/ThemeContext";
import {Button} from "./Button";

export function ThemeToggle() {
    const {isDark, toggleTheme} = useTheme();

    return (
        <Button variant="secondary" onClick={toggleTheme}>
            {isDark ? "☀️ Light mode" : "🌙 Dark mode"}
        </Button>
    );
}