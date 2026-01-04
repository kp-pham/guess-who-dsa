import { useState } from 'react'
import '../styles/Lobby.css'

const tips = [
  'O-notation provides the worst-case analysis.',
  'Ω-notation provides the best-case analysis.',
  'Θ-notation provides the average-case analysis.',
  'Amortized analysis analyzes the average cost of an operation over a sequence of operations.',
  'Stacks store elements into LIFO order (Last In, First Out).',
  'Queues store elements in FIFO order (First In, First Out).',
  'Deques allow for push and pop operations from both ends.',
  'Linked Lists store elements in nodes with references to other nodes instead of contiguous memory.',
  'Binary Search Trees have nodes whose values are greater than values of the nodes in the left subtree and less than values of the nodes in the right subtree.',
  'Binary Search Trees degenerate into linked lists when nodes are inserted in sorted order.',
  'Heap are used to implement priority queues.',
  'Red-black trees are self-balancing binary search trees.',
  'Preorder Traversal: Root (1), Left subtree (2), Right subtree (3)',
  'Inorder Traversal: Left subtree (1), Root (2), Right subtree (3)',
  'Postorder Traversal: Left Subtree (1), Right Subtree (2), Root (3)',
  'Tree traversals take O(n) time when binary trees becomes degenerate.',
  'Level Order Traversal uses a queue to traverse nodes in the same level before the next level.',
  'Dijkstra\'s Algorithm uses the priority queue to determine the shortest path from the source node to all other nodes in the graph.',
  'Directed Acyclic Graphs (DAGs) are required for Topological Sort.',
  'O(n log(n)) is the lower bound time complexity for comparison-based sorting.',
  'Stable sorting algorithms sort repeated elements in the same order as they appear in the input.',
  'Divide and Conquer algorithms recursively break down larger problems into smaller subproblems.',
  'Hash tables use a hash function to generate a hash value for keys which are used to index for values.',
  'The Union-Find Algorithm uses a disjoint-set forest to determine whether two elements belong in the same equivalence class.',
]

function Lobby() {
  const [index, setIndex] = useState(Math.floor(Math.random() * tips.length))

  function handleClick() {
    let current;
    do {
      current = Math.floor(Math.random() * tips.length)
    } while (index === current)
    
    setIndex(current)
  }

  return (
    <main id="lobby">
      <section>
        <p id="status">Finding opponent...</p>
      </section>
      <button id="tip" onClick={handleClick} type="button">
        {tips[index]}
      </button>
    </main>
  )
}

export default Lobby