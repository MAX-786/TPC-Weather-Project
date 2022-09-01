const inp = document.querySelector("input");
//disable by default
if (inp) {
    document.querySelector("button").disabled = true;

    inp.onkeyup = () => {

        if (inp.value.length === 0) {
            document.querySelector("button").disabled = true;
        } else {
            document.querySelector("button").disabled = false;
        }
    }

    const id = document.querySelector("#bgColor").innerHTML.slice(0, 2);
}