import {
  fetchBodyCopy,
  getFullPageByCodename,
  getComponentById,
  getLinkedEntities
} from './westfield-rise-contentful-client';
import {IFilterableSortableListFields} from '../../@types/generated/contentful';

//describe('Contentful Service for ', () => {
  
//   it('fetches data from Contentful', async () => {
//     const entries = await getFullPageByCodename('page');

//     // Check that we got some entries
//     expect(entries.items.length).toBeGreaterThan(0);

//     // Check the structure of the first entry
//     // (replace 'title' and 'description' with your actual fields)
//     const firstEntry = entries.items[0];
//     expect(firstEntry.fields).toHaveProperty('internalName');
//     expect(firstEntry.fields).toHaveProperty('title');
//   });

//   it('fetches data from Contentful', async () => {
//     const entries = await fetchBodyCopy('bodyCopy');

//     // Check that we got some entries
//     expect(entries.items.length).toBeGreaterThan(0);

//     // Check the structure of the first entry
//     // (replace 'title' and 'description' with your actual fields)
//     const firstEntry = entries.items[0];
//     expect(firstEntry.fields).toHaveProperty('internalName');
//     expect(firstEntry.fields).toHaveProperty('bodyCopyText');
//   });
// });


// it('fetches data from Contentful by Id', async () => {
//   const entries = await getComponentById('6fOeNpt9PAJNQwZaw69DOI', 'en-US', false);
//   // Check that we got some entries
//   expect(entries.items.length).toBeGreaterThan(0);

//   // Check the structure of the first entry
//   // (replace 'title' and 'description' with your actual fields)
//   const firstEntry = entries.items[0];
//   expect(firstEntry.fields).toHaveProperty('internalName');
// });


//  /// westfield-rise-contentful-client.spec.ts
//  it('fetches data from Contentful by Id', async () => {
//   const entries = await getComponentById('34sKAHD1scYqONWtuCNiDw', 'en-US', false);
//   // Check that we got some entries
//   expect(entries.items.length).toBeGreaterThan(0);

//   const item = entries?.items[0].fields as IFilterableSortableListFields;
//   if(item.listItemType?.sys.contentType.sys.id)
//   console.log(item.listItemType?.sys.contentType.sys.id); 
//   // Check the structure of the first entry
//   // (replace 'title' and 'description' with your actual fields)
//   const firstEntry = entries.items[0];
//   expect(firstEntry.fields).toHaveProperty('internalName');
// });


// it('fetches data from Contentful by Id', async () => {
//   const entries = await getLinkedEntities({contentType: 'page', entryIds: ['7e8RDhFRtAtIodplN2tGXE','1smy3ArDGABZ4L3drafaE1'], preview:false});
//   // Check that we got some entries
//   expect(entries.items.length).toBeGreaterThan(0);

//   const item = entries?.items[0].fields as IFilterableSortableListFields;
//   if(item.listItemType?.sys.contentType.sys.id)
//   console.log(item.listItemType?.sys.contentType.sys.id); 
//   // Check the structure of the first entry
//   // (replace 'title' and 'description' with your actual fields)
//   const firstEntry = entries.items[0];
//   expect(firstEntry.fields).toHaveProperty('internalName');
// });

