document.addEventListener('DOMContentLoaded', function() {
    function syncInputs(sliderId, numberId) {
        const slider = document.getElementById(sliderId);
        const numberInput = document.getElementById(numberId);

        if (slider && numberInput) {
            slider.addEventListener('input', function() {
                numberInput.value = slider.value;
            });
            numberInput.addEventListener('input', function() {
                if (Number(numberInput.value) > parseInt(numberInput.max)) {
                    numberInput.value = numberInput.max;
                }
                if (Number(numberInput.value) < parseInt(numberInput.min)) {
                    numberInput.value = numberInput.min;
                }
                slider.value = numberInput.value;
            });
        }
    }

    // Sync homework sliders and inputs
    for (let i = 1; i <= 6; i++) {
        syncInputs(`hw-${i}`, `hw-${i}-input`);
    }

    // Sync exam sliders and inputs
    syncInputs('midterm-score', 'midterm-score-input');
    syncInputs('final-score', 'final-score-input');
});
