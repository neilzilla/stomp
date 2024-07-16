/**
 *  Example: Biscuits Office
 * This example outputs to the console a small section of track
 * which runs behind Sheaf Bank Business Park.
 *
 * Please set the following in your env file
 * AREA_ID=Y4
 * SIGNAL_BLOCKS=68,69,70,76,77,78,79,80,81
 *
 */

function do_visual(data) {
    if (!data) data = {};
    const signals = [68, 69, 70, 76, 77, 78, 79, 80, 81];

    const signal_blocks = {};

    // we use strings not integers, not sure if there's a benefit
    // this sets them as 4 spaces if nothing is at the block
    signals.forEach((i) => {
        let index = String(i);
        signal_blocks[index] = data[index] && data[index] !== "" ? data[index] : "    ";
    });

    process.stdout.write("\x1Bc");
    console.log(`
        ______[${signal_blocks["69"]}]>69______[${signal_blocks["77"]}]>77__________________[${signal_blocks["79"]}]>79____
                                                     \\__[${signal_blocks["81"]}]>81____
        _____68<[${signal_blocks["68"]}]_______76<[${signal_blocks["76"]}]___78<[${signal_blocks["78"]}]__
           \\_70<[${signal_blocks["70"]}]__/                           \\___80<[${signal_blocks["80"]}]____
        `);
}

do_visual();

module.exports = function (signal_blocks) {
    do_visual(signal_blocks);
};
