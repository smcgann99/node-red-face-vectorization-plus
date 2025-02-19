[![platform](https://img.shields.io/badge/platform-Node--RED-red)](https://nodered.org)
[![npm version](https://img.shields.io/npm/v/@smcgann/node-red-face-vectorization-plus.svg)](https://www.npmjs.com/package/@smcgann/node-red-face-vectorization-plus)
[![Min Node Version](https://img.shields.io/node/v/@smcgann/node-red-face-vectorization-plus)](https://www.npmjs.com/package/@smcgann/node-red-annotate-image-plus)
[![GitHub license](https://img.shields.io/github/license/smcgann99/node-red-face-vectorization-plus)](https://github.com/smcgann99/node-red-face-vectorization-plus/blob/main/LICENSE)

# @s.mcgann/node-red-face-vectorization-plus

A <a href="http://nodered.org" target="_blank">Node-RED</a> node that vectorizes facial images using AI in Node-RED.

You can use the output of this node with 🔗 [@smcgann99/node-red-cosine-similarity-plus](https://www.npmjs.com/package/@smcgann/node-red-cosine-similarity-plus) 
 as part of a face recognition flow. 

This node is based on 🔗 [@good-i-deer/node-red-contrib-face-vectorization](https://www.npmjs.com/package/@good-i-deer/node-red-contrib-face-vectorization)

## **Key Changes**
 
✔ Added **Typed Input** for incoming msg property.   
✔ Updated **dependencies**.    
✔ Removed **unnecessary dependencies**.  
✔ **Easier integration** into Node-RED flows.

---
## **Installation**
Either use the Edit Menu - Manage Palette option to install, or run the following command in your Node-RED user directory - typically `~/.node-red`

``` bash
cd ~/.node-red
npm install @smcgann/node-red-face-vectorization-plus
```

Restart your Node-RED instance

---

## **Input Properties** 

### 👤 Single Image

- The input can be one of the following:
  - Buffer: A Buffer containing the image data.
  - File Path: A string representing the file path to the image.

### 👥 Image Array

 -  The input should be an array of Buffers, each containing the image data for one face.
---

## **Node Properties**  
<img width="500" alt="Properties" src="https://raw.githubusercontent.com/smcgann99/node-red-face-vectorization-plus/main/assets/config.png">

### 🏷️ **Name**  
- The name displayed in the Node-RED editor.  

### **Property**
- Incomming `msg` property to use ( `Default msg.payload` )

### 📥 **Input Type**

- You can choose whether to input a single image or multiple images.
  - **Single Image**: Insert one image buffer, file path, or URL.
  - **Multiple Images**: Insert multiple image buffers in the form of an array.

### 📤 **Return Type**

- You can choose how to receive the vector result:
  - **Output**: Receive the vector result as an array.
  - **Save to File**: Save the vector result as a file. The data will be saved as an array of vector arrays of faces. When this option is selected, the Path and Method properties are activated. It is recommended to save the data as a text file.

### 📂 **Path**

- Specify the desired file path, including the file name and extension, when saving the vector data as a text file. If an absolute path is not specified, it will be determined based on the execution space.

### 🔧 **Method**

- When saving a file, you can choose whether to:
  - **Overwrite**: Overwrite the existing file.
  - **Add**: Append to the existing file. 
  
  If the file does not already exist, it will be created.

## 📤 Output

Array of Arrays

- Vectors for faces are output in the form of an array to `msg.payload`.

Text File

- Save vector data in file format. Depending on the method, overwrite or add to the file.
<hr>



## ✍️ Authors
**[S.McGann](https://github.com/smcgann99)** → Modified Version.  

[**GOOD-I-DEER**](https://github.com/GOOD-I-DEER) in SSAFY(Samsung Software Academy for Youth) 9th

- [Kim Jaea](https://github.com/kimjaea)
- [Yi Jong Min](https://github.com/chickennight)
- [Lee Deok Yong](https://github.com/Gitgloo)
- [Lee Che Lim](https://github.com/leecr1215)
- [Lee Hyo sik](https://github.com/hy06ix)
- [Jung Gyu Sung](https://github.com/ramaking)
<hr>

## 📜 Copyright and license

S.McGann → Modified Version   
Copyright Samsung Automation Studio Team under the [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0)

<hr>

## Reference

- [Node-RED Creating Nodes](https://nodered.org/docs/creating-nodes/)
- [SamsungAutomationStudio Github Repository](https://github.com/Samsung/SamsungAutomationStudio)
- [FaceNet: A Unified Embedding for Face Recognition and Clustering](https://www.cv-foundation.org/openaccess/content_cvpr_2015/papers/Schroff_FaceNet_A_Unified_2015_CVPR_paper.pdf)
- [VGGFace2](https://paperswithcode.com/dataset/vggface2-1)
- [inception_resnet_v1](https://github.com/timesler/facenet-pytorch/blob/master/models/inception_resnet_v1.py)
<hr>
