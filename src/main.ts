import "./main.scss";

// Current section index
let currentSection: number = 0;
// Collection of all sections
const sections: NodeListOf<HTMLElement> = document.querySelectorAll(".scroll-section");
// Variables to store the Y position of touch start and end
let touchStartY: number = 0;
let touchEndY: number = 0;

// Event listener for mouse wheel event
window.addEventListener("wheel", (e: WheelEvent) => {
    const target = e.target as Element;
    // Ignore scrolling for scrollable elements
    if (isScrollableElement(target)) return;
    handleScroll(e);
});

// Event listener for touch start event
window.addEventListener(
    "touchstart",
    (e: TouchEvent) => {
        const target = e.target as Element;
        // Ignore touch events for scrollable elements
        if (isScrollableElement(target)) return;
        touchStartY = e.touches[0].clientY;
    },
    false,
);

// Event listener for touch end event
window.addEventListener(
    "touchend",
    (e: TouchEvent) => {
        const target = e.target as Element;
        // Ignore touch events for scrollable elements
        if (isScrollableElement(target)) return;
        touchEndY = e.changedTouches[0].clientY;
        handleScroll();
    },
    false,
);

// Event listener for window resize event
window.addEventListener("resize", adjustScrollPosition);

// Function to handle the scrolling, either by wheel or touch
function handleScroll(e?: WheelEvent): void {
    // Determine the direction of the scroll
    let isScrollDown: boolean = e instanceof WheelEvent ? e.deltaY > 0 : touchStartY > touchEndY;

    // Update the current section index based on the scroll direction
    if (isScrollDown && currentSection < sections.length - 1) {
        currentSection++; // Scroll down
    } else if (!isScrollDown && currentSection > 0) {
        currentSection--; // Scroll up
    }
    scroll();
}

// Function to apply the scrolling effect to sections
function scroll(): void {
    const yOffset: number = -currentSection * window.innerHeight;
    sections.forEach((section: HTMLElement) => {
        // Move each section to its new position
        section.style.transform = `translateY(${yOffset}px)`;
    });
}

// Function to check if an element is scrollable
function isScrollableElement(el: Element): boolean {
    // Returns true if the element is a textarea or has a class 'scrollable'
    return el.matches("textarea, .scrollable") || el.closest(".scrollable") != null;
}

// Function to adjust the scroll position on window resize
function adjustScrollPosition(): void {
    // Recalculate the yOffset when the window size changes
    const yOffset: number = -currentSection * window.innerHeight;
    sections.forEach((section: HTMLElement) => {
        // Adjust each section to align with the new window size
        section.style.transform = `translateY(${yOffset}px)`;
    });
}
