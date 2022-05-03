import style from "../assets/styles/Header.module.scss";


export default function SearchInput() {
    return(
        <div className={style.search__wrapper}>
            <form className={style.search__input}>
                <input type="search" placeholder="Search..." />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}