import style from '../assets/styles/Footer.module.scss';

const Footer = () => {

    const socialNetworks = [
        {
            id: 1,
            description: "instagram",
            resourcePath: "https://www.instagram.com/",
            logoUrl: "https://cdn-icons-png.flaticon.com/512/87/87390.png"
        },
        {
            id: 2,
            description: "facebook",
            resourcePath: "https://www.facebook.com/",
            logoUrl: "https://cdn-icons-png.flaticon.com/512/2111/2111392.png"
        },
        {
            id: 3,
            description: "github",
            resourcePath: "https://github.com/",
            logoUrl: "https://cdn-icons-png.flaticon.com/512/1051/1051377.png"
        },
        {
            id: 4,
            description: "linkedin",
            resourcePath: "https://www.linkedin.com/feed/",
            logoUrl: "https://cdn-icons-png.flaticon.com/512/254/254394.png"
        }
    ]
    return(
        <footer className={style.footer}>
            <div className={style.footer__inner}>

                <div className={style.social__wrapper}>
                    <div className={style.social__inner}>
                        {socialNetworks.map(item => {
                            return (
                                <a key={item.id} href={item.resourcePath}>
                                    <img src={item.logoUrl} alt={item.description}/>
                                </a>
                            )
                        })}
                    </div>
                </div>
                <div className={style.social__wrapper}>
                    <div className={style.footer__description}>
                        <p>Copyright ©2022 | This about Cats</p>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer;