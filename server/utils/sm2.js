/**
 * SM-2 Algorithm Implementation
 * Based on SuperMemo-2 logic for spaced repetition.
 * 
 * @param {number} quality - User rating: 0 to 5 (Simplified: Hard=1, Medium=3, Easy=5)
 * @param {number} reps - Current number of successful repetitions
 * @param {number} easiness - Current easiness factor (EF)
 * @param {number} interval - Current interval in days
 * @returns {object} Updated reps, easiness, interval, and nextReviewDate
 */
function calculateSM2(quality, reps, easiness, interval) {
    let nextReps;
    let nextEasiness;
    let nextInterval;

    if (quality >= 3) {
        // Success
        if (reps === 0) {
            nextInterval = 1;
        } else if (reps === 1) {
            nextInterval = 6;
        } else {
            nextInterval = Math.round(interval * easiness);
        }
        nextReps = reps + 1;
        nextEasiness = easiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    } else {
        // Failure
        nextReps = 0;
        nextInterval = 1;
        nextEasiness = easiness;
    }

    if (nextEasiness < 1.3) nextEasiness = 1.3;

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + nextInterval);

    return {
        reps: nextReps,
        easiness: nextEasiness,
        interval: nextInterval,
        nextReviewDate,
        mastery: calculateMastery(nextReps, nextEasiness, nextInterval)
    };
}

function calculateMastery(reps, easiness, interval) {
    // Simple mastery heuristic: combination of reps and interval
    let mastery = (reps * 5) + (interval / 2);
    return Math.min(Math.round(mastery), 100);
}

module.exports = { calculateSM2 };
