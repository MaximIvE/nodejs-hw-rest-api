const generatorId = (result) =>{
    return (Number(result[result.length - 1].id) + 1).toString() || 1;
}

module.exports = generatorId;