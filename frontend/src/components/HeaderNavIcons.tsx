export default function HeaderNavIcons(props: { className: string; }) {

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
        }
    ]

    return(
        <div className={props.className}>
            {socialNetworks.map(item => {
                return (
                    <a key={item.id} href={item.resourcePath}>
                        <img src={item.logoUrl} alt={item.description}/>
                    </a>
                )
            })}
        </div>
    )
}