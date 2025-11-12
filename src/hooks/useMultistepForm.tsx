import { useState, type ReactElement } from "react";

export function useMultistepForm(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    function next() {
        setCurrentStepIndex((i) => {
            if (i >= steps.length - 1) return i;
            // Mark current step as completed
            if (!completedSteps.includes(i)) {
                setCompletedSteps([...completedSteps, i]);
            }
            return i + 1;
        });
    }

    function back() {
        setCurrentStepIndex((i) => {
            if (i <= 0) return i;
            return i - 1;
        });
    }

    function goTo(index: number) {
        setCurrentStepIndex(index);
    }

    function markStepComplete(index: number) {
        if (!completedSteps.includes(index)) {
            setCompletedSteps([...completedSteps, index]);
        }
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        completedSteps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        goTo,
        next,
        back,
        markStepComplete,
    };
}
