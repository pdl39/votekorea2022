const _generateChartData = (resultData, label = '선택 %', color = '#fff', backgroundColorA = 0.3, borderColorA = 0.6, borderWidth = 2, hoverOffset = 8) => {
  // convert totalCount to string with commas:
  const totalCount = resultData.totalChoiceCount;
  const countStr = totalCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return {
    title: `${countStr} 명의 선택 결과:`,
    labels: resultData.items.map(item => item.name),
    datasets: [
      {
        label,
        data: resultData.items.map(item => item.choiceCount / totalCount * 100),
        backgroundColor: resultData.items.map(item => `rgb(${item.colorR}, ${item.colorG}, ${item.colorB}, ${backgroundColorA})`),
        borderColor: resultData.items.map(item => `rgb(${item.colorR}, ${item.colorG}, ${item.colorB}, ${borderColorA})`),
        borderWidth,
        color,
        hoverOffset,
      },
    ],
  };
}

export default _generateChartData;
