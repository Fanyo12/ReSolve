export function getUser() {
    const user = localStorage.getItem("user");

    if (!user) return null;

    return JSON.parse(user);
}


export function getRole() {
    const user = getUser();

    return user?.role || null;
}


export function hasRole(role) {
    return getRole() === role;
}