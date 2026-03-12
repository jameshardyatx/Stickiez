import { NoteColors } from "./NoteColors";
import type { NoteContent } from "./TNoteContent";

type ColorPickerProps = {
        id: string,
        onUpdate: (id: string, patch: Partial<Pick<NoteContent, "title" | "body" | "color">>) => void;
}

function ColorPicker(props: ColorPickerProps) {

    return (
        <>
            <div className="color-picker">
                {Object.entries(NoteColors).map(([name, color]) => (
                    <div
                        key={name}
                        className="color-swatch"
                        style={{ backgroundColor: color }}
                        title={name}
                        onClick={() => { props.onUpdate(props.id, {color: name}) } }
                    />
                ))}
            </div>
        </>
    )
}

export default ColorPicker;