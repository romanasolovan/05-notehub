import css from './SearchBox.module.css';

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
    return (
        <input
            onChange={e => { onChange(e.target.value) }}
            type="text"
            className={css.input}
            placeholder="Search notes"
            value={value}
        />
    );
};

export default SearchBox;