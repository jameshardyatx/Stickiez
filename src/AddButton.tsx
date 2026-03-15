type AddButtonProps = { onAdd: () => void };
import PlayAnimation from "./PlayAnimation";

export function AddButton({ onAdd }: AddButtonProps) {
  return (
    <button
      className="add-btn"
      type="button"
      onClick={(e) => {
        onAdd();
        PlayAnimation(e.currentTarget, "jello");
      }}
    >
      +
    </button>
  );
}

export default AddButton;