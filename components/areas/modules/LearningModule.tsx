'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Book, Lightbulb, Plus, CheckCircle2, Link2, ChevronRight, GraduationCap } from 'lucide-react';
import { useAreaModulesStore, BookEntry, KnowledgeNode, CourseEntry } from '@/lib/store/area-modules-store';

interface LearningModuleProps { areaId: string; }

const statusColors: Record<BookEntry['status'], string> = {
    want_to_read: 'bg-gray-100 text-gray-700',
    reading: 'bg-blue-100 text-blue-700',
    processing: 'bg-yellow-100 text-yellow-700',
    applied: 'bg-green-100 text-green-700',
    abandoned: 'bg-red-100 text-red-700',
};

const statusLabels: Record<BookEntry['status'], string> = {
    want_to_read: '📚 To Read',
    reading: '📖 Reading',
    processing: '🧠 Processing',
    applied: '✅ Applied',
    abandoned: '🗑️ Dropped',
};

export function LearningModule({ areaId }: LearningModuleProps) {
    const { getLearningData, updateLearningData } = useAreaModulesStore();
    const data = getLearningData(areaId);

    const [addingBook, setAddingBook] = useState(false);
    const [addingNode, setAddingNode] = useState(false);
    const [addingCourse, setAddingCourse] = useState(false);

    const [bookForm, setBookForm] = useState({ title: '', author: '', status: 'want_to_read' as BookEntry['status'] });
    const [nodeForm, setNodeForm] = useState({ title: '', content: '', tags: '' });
    const [courseForm, setCourseForm] = useState({ title: '', platform: '', reason: '' });

    const saveBook = () => {
        if (!bookForm.title) return;
        const book: BookEntry = {
            id: crypto.randomUUID(),
            ...bookForm,
            progressPercent: 0,
            keyIdeas: [],
        };
        updateLearningData(areaId, { books: [...data.books, book] });
        setAddingBook(false);
        setBookForm({ title: '', author: '', status: 'want_to_read' });
    };

    const saveNode = () => {
        if (!nodeForm.title || !nodeForm.content) return;
        const node: KnowledgeNode = {
            id: crypto.randomUUID(),
            title: nodeForm.title,
            content: nodeForm.content,
            connections: [],
            tags: nodeForm.tags.split(',').map(t => t.trim()).filter(Boolean),
            reviewCount: 0,
            createdAt: new Date().toISOString(),
        };
        updateLearningData(areaId, { knowledgeNodes: [...data.knowledgeNodes, node] });
        setAddingNode(false);
        setNodeForm({ title: '', content: '', tags: '' });
    };

    const saveCourse = () => {
        if (!courseForm.title) return;
        const course: CourseEntry = {
            id: crypto.randomUUID(),
            ...courseForm,
            progressPercent: 0,
            status: 'planned',
            keyLearnings: [],
        };
        updateLearningData(areaId, { courses: [...data.courses, course] });
        setAddingCourse(false);
        setCourseForm({ title: '', platform: '', reason: '' });
    };

    const updateBookStatus = (id: string, status: BookEntry['status']) => {
        updateLearningData(areaId, {
            books: data.books.map(b => b.id === id ? { ...b, status } : b)
        });
    };

    const updateBookProgress = (id: string, progress: number) => {
        updateLearningData(areaId, {
            books: data.books.map(b => b.id === id ? { ...b, progressPercent: progress } : b)
        });
    };

    const currentBook = data.books.find(b => b.status === 'reading');
    const toReadBooks = data.books.filter(b => b.status === 'want_to_read').length;
    const appliedBooks = data.books.filter(b => b.status === 'applied').length;

    return (
        <div className="space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                <Card className="text-center">
                    <CardContent className="p-3">
                        <Book className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                        <div className="text-2xl font-bold">{data.books.length}</div>
                        <div className="text-xs text-muted-foreground">Total books</div>
                    </CardContent>
                </Card>
                <Card className="text-center">
                    <CardContent className="p-3">
                        <CheckCircle2 className="h-5 w-5 mx-auto mb-1 text-green-500" />
                        <div className="text-2xl font-bold">{appliedBooks}</div>
                        <div className="text-xs text-muted-foreground">Applied</div>
                    </CardContent>
                </Card>
                <Card className="text-center">
                    <CardContent className="p-3">
                        <Lightbulb className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
                        <div className="text-2xl font-bold">{data.knowledgeNodes.length}</div>
                        <div className="text-xs text-muted-foreground">Ideas captured</div>
                    </CardContent>
                </Card>
            </div>

            {/* Currently Reading */}
            {currentBook && (
                <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-800">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Badge className={statusColors['reading']}>📖 Currently Reading</Badge>
                        </div>
                        <div className="font-semibold">{currentBook.title}</div>
                        <div className="text-sm text-muted-foreground">{currentBook.author}</div>
                        <div className="mt-3 space-y-2">
                            <div className="flex justify-between text-xs">
                                <span>Progress</span>
                                <span className="font-bold">{currentBook.progressPercent}%</span>
                            </div>
                            <input
                                type="range" min="0" max="100" value={currentBook.progressPercent}
                                onChange={e => updateBookProgress(currentBook.id, parseInt(e.target.value))}
                                className="w-full accent-primary"
                            />
                        </div>
                        <div className="flex gap-2 mt-3">
                            <Button
                                size="sm" variant="outline"
                                onClick={() => updateBookStatus(currentBook.id, 'processing')}
                                className="text-xs"
                            >
                                Mark as Finished
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Reading System */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Book className="h-4 w-4 text-blue-500" />
                            Reading System
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setAddingBook(!addingBook)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    {addingBook && (
                        <div className="space-y-2 p-3 border rounded-xl">
                            <Input
                                placeholder="Book title"
                                value={bookForm.title}
                                onChange={e => setBookForm(prev => ({ ...prev, title: e.target.value }))}
                            />
                            <Input
                                placeholder="Author"
                                value={bookForm.author}
                                onChange={e => setBookForm(prev => ({ ...prev, author: e.target.value }))}
                            />
                            <select
                                value={bookForm.status}
                                onChange={e => setBookForm(prev => ({ ...prev, status: e.target.value as BookEntry['status'] }))}
                                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                            >
                                <option value="want_to_read">To Read</option>
                                <option value="reading">Currently Reading</option>
                                <option value="processing">Processing</option>
                                <option value="applied">Applied</option>
                            </select>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setAddingBook(false)}>Cancel</Button>
                                <Button size="sm" onClick={saveBook}>Add Book</Button>
                            </div>
                        </div>
                    )}
                    {data.books.slice(0, 8).map(book => (
                        <div key={book.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                            <div>
                                <span className="text-sm font-medium">{book.title}</span>
                                {book.author && <span className="text-xs text-muted-foreground ml-2">by {book.author}</span>}
                            </div>
                            <select
                                value={book.status}
                                onChange={e => updateBookStatus(book.id, e.target.value as BookEntry['status'])}
                                className="h-7 text-xs rounded border border-input bg-background px-2"
                            >
                                {Object.entries(statusLabels).map(([val, label]) => (
                                    <option key={val} value={val}>{label}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                    {data.books.length === 0 && !addingBook && (
                        <div className="text-center py-4 text-sm text-muted-foreground">
                            Information without application is entertainment. Add books and track your applied learning.
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Knowledge Graph Nodes */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-yellow-500" />
                            Knowledge Atoms
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setAddingNode(!addingNode)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    {addingNode && (
                        <div className="space-y-2 p-3 border rounded-xl">
                            <Input
                                placeholder="Idea title (atomic — one idea per note)"
                                value={nodeForm.title}
                                onChange={e => setNodeForm(prev => ({ ...prev, title: e.target.value }))}
                            />
                            <Textarea
                                placeholder="Explain this idea in your own words"
                                value={nodeForm.content}
                                onChange={e => setNodeForm(prev => ({ ...prev, content: e.target.value }))}
                                rows={3}
                                className="text-sm"
                            />
                            <Input
                                placeholder="Tags (comma-separated)"
                                value={nodeForm.tags}
                                onChange={e => setNodeForm(prev => ({ ...prev, tags: e.target.value }))}
                            />
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setAddingNode(false)}>Cancel</Button>
                                <Button size="sm" onClick={saveNode}>Capture Idea</Button>
                            </div>
                        </div>
                    )}
                    <div className="space-y-2">
                        {data.knowledgeNodes.slice(0, 6).map(node => (
                            <div key={node.id} className="p-3 rounded-xl border">
                                <div className="flex items-start justify-between">
                                    <span className="font-medium text-sm">{node.title}</span>
                                    <Link2 className="h-3 w-3 text-muted-foreground mt-1 flex-shrink-0" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{node.content}</p>
                                {node.tags.length > 0 && (
                                    <div className="flex gap-1 mt-2 flex-wrap">
                                        {node.tags.map(tag => (
                                            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {data.knowledgeNodes.length === 0 && !addingNode && (
                            <div className="text-center py-4 text-sm text-muted-foreground">
                                Capture atomic ideas from your reading. Each idea is a node in your knowledge graph.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Courses */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-purple-500" />
                            Active Courses
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setAddingCourse(!addingCourse)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    {addingCourse && (
                        <div className="space-y-2 p-3 border rounded-xl">
                            <Input
                                placeholder="Course title"
                                value={courseForm.title}
                                onChange={e => setCourseForm(prev => ({ ...prev, title: e.target.value }))}
                            />
                            <Input
                                placeholder="Platform (Udemy, Coursera, YouTube...)"
                                value={courseForm.platform}
                                onChange={e => setCourseForm(prev => ({ ...prev, platform: e.target.value }))}
                            />
                            <Input
                                placeholder="Why are you taking this? What goal does it serve?"
                                value={courseForm.reason}
                                onChange={e => setCourseForm(prev => ({ ...prev, reason: e.target.value }))}
                            />
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setAddingCourse(false)}>Cancel</Button>
                                <Button size="sm" onClick={saveCourse}>Add Course</Button>
                            </div>
                        </div>
                    )}
                    {data.courses.filter(c => c.status !== 'completed').map(course => (
                        <div key={course.id} className="p-3 rounded-xl border">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="font-medium text-sm">{course.title}</span>
                                    {course.platform && (
                                        <span className="text-xs text-muted-foreground ml-2">{course.platform}</span>
                                    )}
                                </div>
                                <Badge variant="outline" className="text-xs">{course.status}</Badge>
                            </div>
                            {course.reason && (
                                <p className="text-xs text-muted-foreground italic">{course.reason}</p>
                            )}
                            <div className="mt-2">
                                <div className="flex justify-between text-xs mb-1">
                                    <span>Progress</span>
                                    <span>{course.progressPercent}%</span>
                                </div>
                                <input
                                    type="range" min="0" max="100" value={course.progressPercent}
                                    onChange={e => updateLearningData(areaId, {
                                        courses: data.courses.map(c =>
                                            c.id === course.id ? { ...c, progressPercent: parseInt(e.target.value), status: parseInt(e.target.value) === 100 ? 'completed' : 'active' } : c
                                        )
                                    })}
                                    className="w-full accent-primary"
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
