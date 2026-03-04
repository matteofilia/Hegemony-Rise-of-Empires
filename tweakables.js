function load_tweakables(context) {
    // Initial Rent Cost For ALL Properties
    context.INITIAL_RENT = 200;
    context.RENT_INCREASE_PER_PASS_GO = 20;

    // Money Gained Each Time Go Is Passed
    context.PASS_GO_MONEY = 200;

    // Money For Each Corner Piece
    context.CORNER_MONEY_A = 500;
    context.CORNER_MONEY_B = 700;
    
    context.MAX_CHANCE_CARDS = 5;
    
    context.UNIT_BUY_COST_MIN = 100;
    context.UNIT_BUY_COST_MAX = 200;
    context.UNIT_SELL_COST_MIN = 50;
    context.UNIT_SELL_COST_MAX = 100;
}

module.exports = {load_tweakables};