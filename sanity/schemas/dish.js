export default {
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name of dish',
      type: 'string',
    },
    {
      name:"short_description",
      type:"string",
      title: "Short Description",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'price',
      title: 'Price of the dish in GBP',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Image of the dish',
      type: 'image',
    },
  ],
  
}
