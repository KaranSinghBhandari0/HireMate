export const scrollToSection = (id, navigate, location) => {
    if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
            const el = document.getElementById(id);
            el?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
    } else {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
    }
};