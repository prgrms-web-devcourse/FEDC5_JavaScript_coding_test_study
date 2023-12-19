function solution(nodeinfo) {
  let answer = [];

  nodeinfo.map((x, i) => x.push(i + 1));
  //y값이 큰 순으로 정렬, 아니면 x값이 작은 순으로 정렬
  const sorted = nodeinfo.sort((a, b) => b[1] - a[1] || a[0] - b[0]);
  const tree = new Tree();

  for (let i = 0; i < sorted.length; i++) {
    const [x, y, node] = sorted[i];
    tree.insert(node, x);
  }

  tree.preOrder(tree.root);
  tree.postOrder(tree.root);

  answer.push(tree.pre);
  answer.push(tree.post);

  return answer;
}

class Node {
  constructor(value, x) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = x;
  }
}

class Tree {
  constructor() {
    this.root = null;
    this.pre = [];
    this.post = [];
  }

  insert(value, x) {
    if (this.root === null) {
      this.root = new Node(value, x);
      return;
    }
    const queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      const currentNode = queue.shift();
      const newNode = new Node(value, x);

      // 부모보다 현재의 새로은 node값의 x가 더 작다면 왼쪽으로
      if (currentNode.x > newNode.x) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          break;
        } else {
          queue.push(currentNode.left);
        }
        // 아니라면 오른쪽으로
      } else {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          break;
        } else {
          queue.push(currentNode.right);
        }
      }
    }
  }

  preOrder(node) {
    if (!node) {
      return;
    }
    this.pre.push(node.value);
    this.preOrder(node.left);
    this.preOrder(node.right);
  }

  postOrder(node) {
    if (!node) {
      return;
    }
    this.postOrder(node.left);
    this.postOrder(node.right);
    this.post.push(node.value);
  }
}
