export default async function time12Hr() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-IN', {hour: 'numeric', minute: 'numeric', second: "numeric", hour12: true});
    return time;
}