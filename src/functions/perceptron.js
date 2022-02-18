// Наш персептрон
export const Perceptron = (no, learningRate = 0.00001) => {

// Задаем стартовые значения
    let learnc = learningRate;
    let bias = 1;

// Случайные веса от -0.3 до 0.3
    let weights = [];
    for (let i = 0; i <= no; i++) {
        weights[i] = Math.random() * 2 - 1;
    }

// Функция активации
    const activate = (inputs) => {
        let sum = 0;
        for (let i = 0; i < inputs.length; i++) {
            sum += inputs[i] * weights[i];
        }
        if (sum > 0) {return 1} else {return 0}
    }

// Обучение
    const train = (inputs, desired) => {
        inputs.push(bias);
        let guess = activate(inputs);
        let error = desired - guess;
        if (error != 0) {
            for (let i = 0; i < inputs.length; i++) {
                weights[i] += learnc * error * inputs[i];
            }
        }
    }
}
