function FooterSocialLink({ href, label, icon }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
            {icon}
        </a>
    );
}

export default FooterSocialLink;
