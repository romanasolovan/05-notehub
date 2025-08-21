import css from "./Loader.module.css";
import { BarLoader } from 'react-spinners';

function Loader({ loading = true }) {
    return (
        <div className={css.loader}>
            <BarLoader
  color="#546b76"
  height={4}
  loading
  speedMultiplier={3}
  width={100}
/>
  {loading && <p className={css.text}>Loading movies, please wait...</p>}
</div>
);
}

export default Loader;