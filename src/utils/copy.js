
/**
 * @description: 新Clipboard API
 * @param {string} text
 * @return {*}
 */
export async function writeClipboard(text, successContent = "复制成功")  {
    try {
      await navigator.clipboard?.writeText(text)
      window.$message?.success(successContent)
    } catch (error) {
     console.log(error);
    }
 }
 
 
 /**
  * @description 读取剪切板内容
  * @return {string}
  */
  export async function readClipboard() {
   const result = await navigator.permissions.query({ name: 'clipboard-read' });
   if (result.state === 'granted' || result.state === 'prompt') {
       return navigator.clipboard
           .readText()
           .then(text => text)
           .catch(err => Promise.reject(err));
   }
   return Promise.reject(result);
 }
 
 
 
 /**
  * @description 复制内容到剪切板
  * @param {string} content 文本内容
  */
  export async  function clearClipboard ()  {
   try {
   await navigator.clipboard?.writeText("")
   } catch (error) {
     console.error('Failed to copy: ', error);
   }
 };
 
 