function blogone() {
    document.getElementById("blog-post").innerHTML = `
    <h3>Why operators are useful</h3>
    </h3>
    <div class='post-header'>
        <div class='post-header-line-1'></div>
    </div>
    <div class='center-content' id='post-body-775339472173253922' itemprop='description articleBody'>
        This is something I posted on python-ideas, but I think it's interesting to a wider audience.<br />
        <br />
        There's been a lot of discussion recently about an operator to merge two dicts.<br />
        <br />
        It prompted me to think about the reason (some) people like operators, and a discussion I had with my mentor
        Lambert Meertens over 30 years ago came to mind.<br />
        <br />
        For mathematicians, operators are essential to how they think. Take a simple operation like adding two
        numbers, and try exploring some of its behavior.<br />
        <br />
        &nbsp;&nbsp;&nbsp; add(x, y) == add(y, x)&nbsp;&nbsp;&nbsp; (1)<br />
        <br />
        Equation (1) expresses the law that addition is commutative. It's usually written using an operator, which
        makes it more concise:<br />
        <br />
        &nbsp;&nbsp;&nbsp; x + y == y + x&nbsp;&nbsp;&nbsp; (1a)<br />
        <br />
        That feels like a minor gain.<br />
        <br />
        Now consider the associative law:<br />
        <br />
        &nbsp;&nbsp;&nbsp; add(x, add(y, z)) == add(add(x, y), z)&nbsp;&nbsp;&nbsp; (2)<br />
        <br />
        Equation (2) can be rewritten using operators:<br />
        <br />
        &nbsp;&nbsp;&nbsp; x + (y + z) == (x + y) + z&nbsp;&nbsp;&nbsp; (2a)<br />
        <br />
        This is much less confusing than (2), and leads to the observation that the parentheses are redundant, so
        now we can write<br />
        <br />
        &nbsp;&nbsp;&nbsp; x + y + z&nbsp;&nbsp;&nbsp; (3)<br />
        <br />
        without ambiguity (it doesn't matter whether the + operator binds tighter to the left or to the
        right).<br />
        <br />
        Many other laws are also written more easily using operators.&nbsp; Here's one more example, about the
        identity element of addition:<br />
        <br />
        &nbsp;&nbsp;&nbsp; add(x, 0) == add(0, x) == x&nbsp;&nbsp;&nbsp; (4)<br />
        <br />
        compare to<br />
        <br />
        &nbsp;&nbsp;&nbsp; x + 0 == 0 + x == x&nbsp;&nbsp;&nbsp; (4a)<br />
        <br />
        The general idea here is that once you've learned this simple notation, equations written using them are
        easier to *manipulate* than equations written using functional notation -- it is as if our brains grasp the
        operators using different brain machinery, and this is more efficient.<br />
        <br />
        I think that the fact that formulas written using operators are more easily processed *visually* has
        something to do with it: they engage the brain's visual processing machinery, which operates largely
        subconsciously, and tells the conscious part what it sees (e.g. "chair" rather than "pieces of wood joined
        together"). The functional notation must take a different path through our brain, which is less subconscious
        (it's related to reading and understanding what you read, which is learned/trained at a much later age than
        visual processing).<br />
        <br />
        The power of visual processing really becomes apparent when you combine multiple operators. For example,
        consider the distributive law:<br />
        <br />
        &nbsp;&nbsp;&nbsp; mul(n, add(x, y)) == add(mul(n, x), mul(n, y))&nbsp; (5)<br />
        <br />
        That was painful to write, and I believe that at first you won't see the pattern (or at least you wouldn't
        have immediately seen it if I hadn't mentioned this was the distributive law).<br />
        <br />
        Compare to:<br />
        <br />
        &nbsp;&nbsp;&nbsp; n * (x + y) == n * x + n * y&nbsp;&nbsp;&nbsp; (5a)<br />
        <br />
        Notice how this also uses relative operator priorities. Often mathematicians write this even more
        compact:<br />
        <br />
        &nbsp;&nbsp;&nbsp; n(x+y) == nx + ny&nbsp;&nbsp;&nbsp; (5b)<br />
        <br />
        but alas, that currently goes beyond the capacities of Python's parser.<br />
        <br />
        Another very powerful aspect of operator notation is that it is convenient to apply them to objects of
        different types. For example, laws (1) through (5) also work when x, y and z are same-size vectors and n is
        a scalar (substituting a vector of zeros for the literal "0"), and also if they are matrices (again, n has
        to be a scalar).<br />
        <br />
        And you can do this with objects in many different domains. For example, the above laws (1) through (5)
        apply to functions too (n being a scalar again).<br />
        <br />
        By choosing the operators wisely, mathematicians can employ their visual brain to help them do math better:
        they'll discover new interesting laws sooner because sometimes the symbols on the blackboard just jump at
        you and suggest a path to an elusive proof.<br />
        <br />
        Now, programming isn't exactly the same activity as math, but we all know that Readability Counts, and this
        is where operator overloading in Python comes in. Once you've internalized the simple properties which
        operators tend to have, using + for string or list concatenation becomes more readable than a pure OO
        notation, and (2) and (3) above explain (in part) why that is.<br />
        <br />
        Of course, it's definitely possible to overdo this -- then you get Perl. But I think that the folks who
        point out "there is already a way to do this" are missing the point that it really is easier to grasp the
        meaning of this:<br />
        <br />
        &nbsp;&nbsp;&nbsp; d = d1 + d2<br />
        <br />
        compared to this:<br />
        <br />
        &nbsp;&nbsp;&nbsp; d = d1.copy()<br />
        &nbsp;&nbsp;&nbsp; d.update(d2)&nbsp;&nbsp;&nbsp; # CORRECTED: This line was previously wrong<br />
        <br />
        and it is not just a matter of fewer lines of code: the first form allows us to use our visual processing to
        help us see the meaning quicker -- and without distracting other parts of our brain (which might already be
        occupied by keeping track of the meaning of d1 and d2, for example).<br />
        <br />
        Of course, everything comes at a price. You have to learn the operators, and you have to learn their
        properties when applied to different object types. (This is true in math too -- for numbers, x*y == y*x, but
        this property does not apply to functions or matrices; OTOH x+y == y+x applies to all, as does the
        associative law.)<br />
        <br />
        "But what about performance?" I hear you ask. Good question. IMO, readability comes first, performance
        second. And in the basic example (d = d1 + d2) there is no performance loss compared to the two-line version
        using update, and a clear win in readability. I can think of many situations where performance difference is
        irrelevant but readability is of utmost importance, and for me this is the default assumption (even at
        Dropbox -- our most performance critical code has already been rewritten in ugly Python or in Go). For the
        few cases where performance concerns are paramount, it's easy to transform the operator version to something
        else -- *once you've confirmed it's needed* (probably by profiling).
        <div style='clear: both;'></div>
    </div>
</div>
    `;
}


function blogtwo() {
    document.getElementById("blog-post").innerHTML = `

    <div class="center-content">
    <h3>What to do with your computer science career</h3>
    I regularly receive questions from students in the field of computer science looking for career advice.
    <br><br>
    Here's an answer I wrote to one of them. It's not comprehensive or anything, but I thought people might find it interesting.
    <br>
    [A question about whether to choose a 9-5 job or be an entrepreneur]
    
    The question about "9-5" vs. "entrepreneur" is a complex one -- not everybody can be a successful entrepreneur (who would do the work? :-) and not everybody has the temperament for it. For me personally it was never an option -- there are vast parts of management and entrepreneurship that I wouldn't enjoy doing, such as hiring (I hate interviewing and am bad at it) and firing (too emotionally draining -- even just giving negative feedback is hard for me). Pitching ideas to investors is another thing that I'd rather do without.
    
    If any of that resonates with you, you may be better off not opting for entrepreneurship -- the kind of 9-5 software development jobs I have had are actually (mostly) very rewarding: I get to write software that gets used by hundreds or thousands of other developers (or millions in the case of Python), and those other developers in turn use my software to produce product that get uses by hundreds of thousands or, indeed hundreds of millions of users. Not every 9-5 job is the same! For me personally, I don't like the product stuff (since usually that means it's products I have no interest in using myself), but "your mileage may vary" (as they say in the US). Just try to do better than an entry-level web development job;  that particular field (editing HTML and CSS) is likely to be automated away, and would feel repetitive to me.
    
    [A question about whether AI would make human software developers redundant (not about what I think of the field of AI as a career choice)]
    
    Regarding AI, I'm not worried at all. The field is focused on automating boring, repetitive tasks like driving a car or recognizing faces, which humans can learn to do easily but find boring if they have to do it all the time. The field of software engineering (which includes the field of AI) is never boring, since as soon as a task is repetitive, you automate it, and you start solving new problems.
    </div>
    `;

}