export default context => ({
  leftIconList: [
    {
      dynamicIcon: 'Toys',
      iconProperties: {
        style: {
          color: context.theme.boaPalette.sec500,
          width: 20,
          height: 20,
        },
      },
    },
    {
      dynamicIcon: 'Traffic',
      iconProperties: {
        style: {
          color: context.theme.boaPalette.pri500,
          width: 20,
          height: 20,
        },
      },
    },
  ],
  rightIconList: [
    {
      dynamicIcon: 'AlarmOn',
      iconProperties: {
        style: {
          color: context.theme.boaPalette.pri500,
          width: 20,
          height: 20,
        },
      },
    },
    {
      dynamicIcon: 'Clear',
      iconProperties: {
        style: {
          color: context.theme.boaPalette.sec500,
          width: 20,
          height: 20,
        },
      },
    },
  ],
});
