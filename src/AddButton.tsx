type AddButtonProps = { onAdd: () => void };

export function AddButton({ onAdd }: AddButtonProps) {
  return (
    <button className="add-btn" type="button" onClick={onAdd}>
      +
    </button>
  );
}

export default AddButton;