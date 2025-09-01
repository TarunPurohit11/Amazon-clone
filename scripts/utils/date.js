const today = dayjs();

export function deliveryDateString(deliveryDays){
    let remainingDays = 0;
    let deliveryDate = dayjs();
    while( remainingDays !== deliveryDays){
        deliveryDate = deliveryDate.add(1,'days');
        if(!isWeekend(deliveryDate))
            remainingDays++
    }
    return deliveryDate.format('dddd, MMMM D');
}

function isWeekend(date){
    const dayString = date.format('dddd');
    return dayString === 'Saturday' || dayString === 'Sunday';
}

