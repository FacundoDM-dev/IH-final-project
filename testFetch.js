// const testFetch = async () => {
//     const baseUrl = 'https://ozgpnpdfcjsmfjntecov.supabase.co';
//     const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96Z3BucGRmY2pzbWZqbnRlY292Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgyMDI2MzUsImV4cCI6MjAwMzc3ODYzNX0.flgWFvSbY50LgDbLE4c8aXgtxkoL87EebFpLNKYvuXw';
//     const table = 'tasks';
    
//     const url = `${baseUrl}/rest/v1/tables/${table}`;
//     const headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${apiKey}`
//     };
    
//     try {
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: headers
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//       } else {
//         throw new Error('Error al obtener los datos');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   testFetch();






